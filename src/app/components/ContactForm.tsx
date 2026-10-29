"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import FieldError from "@/components/FieldError";
import { sendEnquiry } from "@/lib/enquiry";
import {
  ENQUIRY_SERVICES,
  cleanEnquiry,
  sanitizeDigits,
  sanitizeInput,
  sanitizeNameInput,
  sanitizePhoneInput,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/validation";

const services = ENQUIRY_SERVICES;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [loading, setLoading] = useState(false);

  const clearError = (field: EnquiryField) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found = validateEnquiry(raw);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setError("");
      setSent(false);
      const field = (Object.keys(found) as EnquiryField[])[0];
      form.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      return;
    }

    setError("");
    setLoading(true);
    try {
      const result = await sendEnquiry(cleanEnquiry(raw));

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setSent(true);
      setErrors({});
      form.reset();
    } finally {
      setLoading(false);
    }
  }

  const field =
    "mt-1 w-full rounded-xl border border-brand-ink/15 bg-white px-4 py-3 text-brand-ink outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30 aria-[invalid=true]:border-brand-red aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-brand-red/20";
  const label = "block text-sm font-semibold text-brand-ink";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[2rem] bg-white p-6 shadow-xl shadow-brand-red/10 ring-1 ring-brand-ink/10 sm:p-8"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red">
        Enquiry form
      </p>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-brand-ink">Send us an enquiry</h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-ink/55">
        A few details are enough to get started. We&rsquo;ll reply with a menu and a clear quotation.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Your name <span className="text-brand-red">*</span>
          <input
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="contact-name-error"
            onChange={(e) => {
              sanitizeInput(e.currentTarget, sanitizeNameInput);
              clearError("name");
            }}
            className={field}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </label>
        <label className={label}>
          Company
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            aria-invalid={Boolean(errors.company)}
            aria-describedby="contact-company-error"
            onChange={() => clearError("company")}
            className={field}
          />
          <FieldError id="contact-company-error" message={errors.company} />
        </label>
        <label className={label}>
          Phone <span className="text-brand-red">*</span>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            aria-required="true"
            maxLength={16}
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="contact-phone-error"
            onChange={(e) => {
              sanitizeInput(e.currentTarget, sanitizePhoneInput);
              clearError("phone");
            }}
            className={field}
          />
          <FieldError id="contact-phone-error" message={errors.phone} />
        </label>
        <label className={label}>
          Email <span className="text-brand-red">*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            maxLength={160}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="contact-email-error"
            onChange={() => clearError("email")}
            className={field}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </label>
        <label className={label}>
          What do you need?
          <select name="service" className={field}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          People per day (approx.)
          <input
            name="people"
            inputMode="numeric"
            maxLength={12}
            placeholder="e.g. 250"
            aria-invalid={Boolean(errors.people)}
            aria-describedby="contact-people-error"
            onChange={(e) => {
              sanitizeInput(e.currentTarget, (value) => sanitizeDigits(value, 6));
              clearError("people");
            }}
            className={field}
          />
          <FieldError id="contact-people-error" message={errors.people} />
        </label>
      </div>

      <label className={`${label} mt-4`}>
        Message
        <textarea
          name="message"
          rows={4}
          maxLength={4000}
          className={field}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="contact-message-error"
          onChange={() => clearError("message")}
          placeholder="Location, dates, occasion, anything else we should know"
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </label>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm font-medium text-brand-red"
          >
            {error}
          </motion.p>
        )}
        {sent && !error && (
          <motion.p
            key="sent"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl bg-brand-leaf/10 p-3 text-sm font-medium text-brand-leaf-dark"
          >
            Thanks! We&apos;ve received your enquiry and will get back to you soon.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        whileHover={loading ? undefined : { scale: 1.02 }}
        whileTap={loading ? undefined : { scale: 0.97 }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3.5 font-bold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Spinner tone="white" label="Sending enquiry" />}
        {loading ? "Sending…" : "Send enquiry"}
      </motion.button>
      <p className="mt-3 text-center text-xs text-brand-ink/45">
        We only use these details to respond to your enquiry.
      </p>
    </form>
  );
}
