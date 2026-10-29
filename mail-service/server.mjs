/**
 * ZOORO enquiry mail service.
 *
 * A tiny standalone HTTP endpoint that sends website enquiries over SMTP with
 * nodemailer. It exists because the marketing site is exported as static HTML
 * and has no server of its own.
 *
 *   POST /enquiry   JSON body -> { ok: true } or { ok: false, error }
 *   GET  /health    -> { ok: true }
 *
 * Run: npm install && npm start
 */
import { createServer } from "node:http";
import nodemailer from "nodemailer";

/* ---------- config ---------- */

const PORT = Number(process.env.PORT || 8787);
const SMTP_HOST = process.env.SMTP_HOST?.trim();
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE =
  process.env.SMTP_SECURE != null
    ? process.env.SMTP_SECURE === "true"
    : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER?.trim();
const SMTP_PASS = process.env.SMTP_PASS;
const TO = process.env.ENQUIRY_TO_EMAIL?.trim();
const FROM = process.env.ENQUIRY_FROM_EMAIL?.trim() || SMTP_USER;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const missing = [
  ["SMTP_HOST", SMTP_HOST],
  ["ENQUIRY_TO_EMAIL", TO],
  ["SMTP_USER", SMTP_USER],
  ["SMTP_PASS", SMTP_PASS],
].filter(([, value]) => !value);

if (missing.length) {
  console.error(
    `Missing required environment variables: ${missing
      .map(([name]) => name)
      .join(", ")}`,
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

/* ---------- helpers ---------- */

const MAX_BODY = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function corsHeaders(origin) {
  const base = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  if (!ALLOWED_ORIGINS.length) {
    return { ...base, "Access-Control-Allow-Origin": "*" };
  }
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      ...base,
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
    };
  }
  return null;
}

function sendJson(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    ...extraHeaders,
  });
  res.end(body);
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw new Error("Payload too large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const cleanLine = (value, max = 500) =>
  clean(value, max)
    .replace(/[\r\n]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

/** Mirrors src/lib/validation.ts: digits only, +91 / 0 prefixes removed. */
function normalizePhone(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 14 && digits.startsWith("0091")) digits = digits.slice(4);
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

const SERVICES = [
  "Corporate canteen",
  "Industrial catering",
  "Festival & occasion meals",
  "Events & buffets",
  "Healthy meals",
  "Food court",
  "Weddings & bulk catering",
  "Delivery kitchen",
  "Other corporate meals",
];

/** Same rules as the client, so a crafted request can't skip them. */
function validateEnquiry(data) {
  const errors = {};
  const name = cleanLine(data.name, 120);
  const rawPhone = String(data.phone ?? "").trim();
  const phone = normalizePhone(data.phone);
  const email = cleanLine(data.email, 160);
  const company = cleanLine(data.company, 160);
  const service = cleanLine(data.service, 120);
  const people = cleanLine(data.people, 40).replace(/[\s,]/g, "");
  const message = clean(data.message, 4000);

  if (!name) errors.name = "Enter your name.";
  else if (/\d/.test(name)) errors.name = "Name can't contain numbers.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (!/\p{L}/u.test(name)) errors.name = "Name must contain letters.";

  if (rawPhone && /[A-Za-z]/.test(rawPhone)) {
    errors.phone = "Phone number can only contain digits.";
  } else if (!phone) errors.phone = "Enter your phone number.";
  else if (phone.length !== 10) errors.phone = "Phone number must be exactly 10 digits.";
  else if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email))
    errors.email = "Enter a valid email address.";

  if (service && !SERVICES.includes(service)) errors.service = "Choose a service from the list.";

  if (people) {
    const count = Number(people);
    if (!/^\d{1,6}$/.test(people) || count < 1 || count > 200000)
      errors.people = "Enter a number between 1 and 200,000.";
  }

  return {
    errors,
    values: { name, phone, email, company, service, people, message },
  };
}

/* ---------- server ---------- */

const server = createServer(async (req, res) => {
  const origin = req.headers.origin;
  const cors = corsHeaders(origin);
  const path = (req.url || "/").split("?")[0];

  if (req.method === "OPTIONS") {
    res.writeHead(cors ? 204 : 403, cors ?? {});
    res.end();
    return;
  }

  if (req.method === "GET" && path === "/health") {
    sendJson(res, 200, { ok: true }, cors ?? {});
    return;
  }

  if (req.method !== "POST" || path !== "/enquiry") {
    sendJson(res, 404, { ok: false, error: "Not found." }, cors ?? {});
    return;
  }

  if (!cors) {
    sendJson(res, 403, { ok: false, error: "Origin not allowed." });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown";

  let data;
  try {
    data = await readJson(req);
  } catch {
    sendJson(res, 400, { ok: false, error: "Invalid request." }, cors);
    return;
  }

  const { errors, values } = validateEnquiry(data);
  const { name, phone, email, company, service, people, message } = values;

  const firstError = Object.values(errors)[0];
  if (firstError) {
    sendJson(res, 422, { ok: false, error: firstError, fields: errors }, cors);
    return;
  }

  /* Only count submissions that would actually send mail, so a visitor
     correcting typos isn't locked out. */
  if (rateLimited(ip)) {
    sendJson(
      res,
      429,
      { ok: false, error: "Too many enquiries. Please try again later." },
      cors,
    );
    return;
  }

  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Company", company],
    ["Service", service],
    ["People per day", people],
    ["Message", message],
  ].filter(([, value]) => value);

  try {
    const info = await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry: ${name}${company ? ` (${company})` : ""}`,
      text: rows.map(([key, value]) => `${key}: ${value}`).join("\n"),
      html: `
        <h2>New enquiry from the ZOORO website</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          ${rows
            .map(
              ([key, value]) =>
                `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(
                  key,
                )}</td><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`,
            )
            .join("")}
        </table>
      `,
    });

    console.log(`Enquiry from ${email} sent to ${TO} (${info.messageId})`);
    sendJson(res, 200, { ok: true }, cors);
  } catch (error) {
    console.error("Failed to send enquiry:", error);
    sendJson(
      res,
      502,
      {
        ok: false,
        error: "Could not send your enquiry right now. Please try again.",
      },
      cors,
    );
  }
});

server.listen(PORT, () => {
  console.log(`ZOORO mail service listening on port ${PORT}`);
});
