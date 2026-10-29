/**
 * Shared enquiry validation, used by both the homepage form and the contact
 * form. The standalone mail service in `mail-service/` mirrors these rules on
 * the server, so a crafted request can't bypass them.
 */

export const ENQUIRY_SERVICES = [
  "Corporate canteen",
  "Industrial catering",
  "Festival & occasion meals",
  "Events & buffets",
  "Healthy meals",
  "Food court",
  "Weddings & bulk catering",
  "Delivery kitchen",
  "Other corporate meals",
] as const;

export type EnquiryField =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "service"
  | "people"
  | "message";

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** Digits only, with +91 / 0 prefixes removed. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 14 && digits.startsWith("0091")) digits = digits.slice(4);
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

/** Trims every value so the payload sent to the mail service is clean. */
export function cleanEnquiry(
  data: Record<string, string>,
): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    cleaned[key] = String(value ?? "").trim();
  }
  cleaned.phone = normalizePhone(cleaned.phone ?? "");
  cleaned.people = (cleaned.people ?? "").replace(/[\s,]/g, "");
  return cleaned;
}

/**
 * Returns a map of field → message. An empty object means the enquiry is valid.
 * Expects raw (untrimmed) form values.
 */
export function validateEnquiry(
  raw: Record<string, string>,
): EnquiryErrors {
  const data = cleanEnquiry(raw);
  const errors: EnquiryErrors = {};

  const name = data.name ?? "";
  if (!name) errors.name = "Enter your name.";
  else if (/\d/.test(name)) errors.name = "Name can't contain numbers.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";
  else if (!/\p{L}/u.test(name)) errors.name = "Name must contain letters.";

  if ((data.company ?? "").length > 160) {
    errors.company = "Company must be 160 characters or fewer.";
  }

  const rawPhone = (raw.phone ?? "").trim();
  const phone = data.phone ?? "";
  if (rawPhone && /[A-Za-z]/.test(rawPhone)) {
    errors.phone = "Phone number can only contain digits.";
  } else if (!phone) errors.phone = "Enter your phone number.";
  else if (phone.length !== 10)
    errors.phone = "Phone number must be exactly 10 digits.";
  else if (!/^[6-9]\d{9}$/.test(phone))
    errors.phone = "Enter a valid 10-digit mobile number.";

  const email = data.email ?? "";
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 160) errors.email = "Email must be 160 characters or fewer.";
  else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email))
    errors.email = "Enter a valid email address, like name@company.com.";

  const service = data.service ?? "";
  if (service && !(ENQUIRY_SERVICES as readonly string[]).includes(service)) {
    errors.service = "Choose a service from the list.";
  }

  const people = data.people ?? "";
  if (people) {
    const count = Number(people);
    if (!/^\d{1,6}$/.test(people) || count < 1 || count > 200000) {
      errors.people = "Enter a number between 1 and 200,000.";
    }
  }

  if ((data.message ?? "").length > 4000) {
    errors.message = "Message must be 4,000 characters or fewer.";
  }

  return errors;
}

/* ---------- input filtering ---------- */

/** Drops digits so a name field can't contain numbers. */
export const sanitizeNameInput = (value: string) => value.replace(/\d/g, "");

/** Keeps digits only, capped at `max` characters. */
export const sanitizeDigits = (value: string, max: number) =>
  value.replace(/\D/g, "").slice(0, max);

/**
 * Phone entry: keeps digits, folds a pasted `+91` / `0091` / leading `0` into a
 * plain 10-digit number, and never exceeds 10 digits.
 */
export const sanitizePhoneInput = (value: string) =>
  normalizePhone(value).slice(0, 10);

/**
 * Rewrites an input's value with `sanitize` while keeping the caret where the
 * user expects it after the blocked characters are removed.
 */
export function sanitizeInput(
  el: HTMLInputElement,
  sanitize: (value: string) => string,
) {
  const raw = el.value;
  const cleaned = sanitize(raw);
  if (cleaned === raw) return;
  const caret = el.selectionStart ?? raw.length;
  const cleanedCaret = sanitize(raw.slice(0, caret)).length;
  el.value = cleaned;
  el.setSelectionRange(cleanedCaret, cleanedCaret);
}
