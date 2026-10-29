# ZOORO mail service

Standalone nodemailer endpoint for the website's enquiry form. The marketing
site is a static export (`out/`), so it has no server of its own; this tiny
service does the SMTP work.

```
POST /enquiry   { name, phone, email, company?, service?, people?, message? }
                -> 200 { ok: true }
                -> 422 { ok: false, error, fields }   invalid input
                -> 429 { ok: false, error }           too many enquiries
                -> 502 { ok: false, error }           SMTP failed
GET  /health    -> 200 { ok: true }
```

Validation mirrors `src/lib/validation.ts`: name 2–120 characters with at
least one letter, phone exactly 10 digits (a `+91` or leading `0` prefix is
stripped), a valid email up to 160 characters, `people` between 1 and 200,000,
message up to 4,000 characters, and `service` from the site's list.

## Local run

```bash
cd mail-service
npm install
cp .env.example .env      # then fill in the SMTP details
node --env-file=.env server.mjs
```

Node 18+ can load `.env` with `--env-file`; on older setups use `dotenv` or
export the variables in your shell.

Test it:

```bash
curl -X POST http://localhost:8787/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"9999999999","email":"test@example.com","message":"Hello"}'
```

## Deploy

Any host that can run a small Node process works (VPS, Render, Railway, Fly.io,
Hostinger Node hosting, a cPanel Node app, etc.):

1. Upload/copy this folder and run `npm install --omit=dev`.
2. Set the environment variables from `.env.example` in the host's panel.
3. Start with `npm start` and point a domain/subdomain at it, e.g.
   `https://mail.zoorohospitality.com`.
4. Confirm `GET https://mail.zoorohospitality.com/health` returns `{"ok":true}`.

Keep it on HTTPS — the website is served over HTTPS and browsers block
mixed-content requests.

## Point the website at it

In the site's `.env.local` (or your build environment):

```
NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://mail.zoorohospitality.com/enquiry
```

Then rebuild:

```bash
npm run build
```

`NEXT_PUBLIC_*` values are baked in at build time, so the site must be rebuilt
after changing it. The variable is required — without it the forms show an
error instead of sending.

For local development, `.env.development.local` points the forms at
`http://localhost:8787/enquiry`; `next dev` reads it, `next build` ignores it.

## SMTP settings for Google Workspace

If the domain's mail is on Google (MX points at Google), use:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@zoorohospitality.com
SMTP_PASS=<16-character App Password>
```

An App Password requires 2-Step Verification on that exact account:
Google Account → Security → 2-Step Verification → App passwords.

`535-5.7.8 Username and Password not accepted` means Google rejected the
credentials. Common causes:

- the App Password was created in a different Google account than `SMTP_USER`;
- 2-Step Verification is off, so no App Password exists (a normal account
  password will not work over SMTP);
- the App Password was revoked, or the Workspace admin disabled App Passwords;
- the mailbox does not exist.

App Passwords are shown as four groups of four letters; spaces are optional.

## Notes

- `ALLOWED_ORIGINS` controls CORS. Set it to your live domains once deployed;
  leaving it empty allows any origin.
- Simple in-memory rate limit: 5 submissions per IP per 10 minutes. Restarting
  the process resets it.
- Credentials stay on this service — never add SMTP secrets to the website's
  client-side code.
