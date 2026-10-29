"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import Spinner from "@/components/Spinner";
import FieldError from "@/components/FieldError";
import { ClientLogoMarquee } from "./components/ClientLogos";
import { additionalServices, contact } from "@/lib/site";
import { sendEnquiry } from "@/lib/enquiry";
import {
  cleanEnquiry,
  sanitizeInput,
  sanitizeNameInput,
  sanitizePhoneInput,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/validation";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- icons ---------- */

function IconShield({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3 19 6v6c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconTrend({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 4-4 3 3 5-6" />
    </svg>
  );
}

function IconLeaf({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 4C13 4 7 7.5 7 14a5 5 0 0 0 5 5c6.5 0 8-6 8-15Z" />
      <path d="M4 21c2.5-5 6-8 11-10" />
    </svg>
  );
}

function IconReceipt({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

/* ---------- data ---------- */

const ticker = [
  "Corporate canteen",
  "Industrial catering",
  "Diwali menus",
  "Events & buffets",
  "Healthy meals",
  "Food court",
  "Weddings & bulk catering",
  "Delivery kitchen",
  "Eid & Christmas lunches",
  "Annual day catering",
  "Pongal & Sankranti thali",
];

const occasions = [
  "Diwali", "Eid", "Christmas", "Pongal", "Sankranti", "New Year",
  "Republic Day", "Independence Day", "Annual day", "Birthdays",
  "Client meets", "Trainings", "Team lunches", "Farewells",
];

const festiveOccasions = occasions.slice(0, 8);
const companyOccasions = occasions.slice(8);

const steps = [
  { t: "Tell us your need", d: "Share headcount, location, meal timings or the occasion." },
  { t: "We plan the menu", d: "Weekly cycles or a festival menu, with nutrition and allergen tags." },
  { t: "We cook and serve", d: "Trained staff, a hygienic kitchen and a fast scan-and-serve counter." },
  { t: "You review", d: "Ratings, feedback and clear monthly invoices keep everyone aligned." },
];

const why = [
  { c: "bg-brand-red", tint: "bg-brand-red/10 text-brand-red", icon: IconShield, t: "Hygiene first", d: "Daily checklists, temperature logs, food sample retention and FSSAI-ready kitchens." },
  { c: "bg-brand-gold", tint: "bg-brand-gold/15 text-brand-red", icon: IconTrend, t: "Cooked to real demand", d: "Employees pre-book or opt out, so we cook what is needed and waste less." },
  { c: "bg-brand-leaf", tint: "bg-brand-leaf/10 text-brand-leaf-dark", icon: IconLeaf, t: "Healthy by design", d: "Every dish has a recipe, calories and allergen tags." },
  { c: "bg-brand-ink", tint: "bg-brand-ink/5 text-brand-ink", icon: IconReceipt, t: "Clear billing", d: "Monthly GST invoices built from meals actually served, with date-wise counts." },
];

const serviceCards = [
  {
    title: "Corporate canteen",
    description:
      "Breakfast, lunch, snacks and dinner inside your office. Employees pre-book on their phone and scan a QR pass at the counter.",
    image: "/corparate-canteen.png",
    video: "/wp-video.mp4",
    className: "md:row-span-2",
  },
  {
    title: "Industrial catering",
    description:
      "High-volume, multi-shift meals for factories and plants, night shift included.",
    image: "/Flaming wok stir-fry in a professional kitchen.png",
    className: "",
  },
  {
    title: "Events & buffets",
    description:
      "Silver, Gold and Platinum menu packages for conferences and celebrations.",
    image: "/bhuffi.png",
    className: "",
  },
  {
    title: "Healthy meal plans",
    description:
      "Calories, protein and allergen info on every dish, with diet and high-protein options for teams.",
    image: "/helthy-food.png",
    video: "/healhty-food.mp4",
    className: "md:col-span-2",
  },
];

/* ---------- helpers ---------- */

/* Hero logo: the real ZOORO lockup inside an animated plate */
function HeroLogo() {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.4, delay, ease },
  });

  return (
    <motion.div
      className="zooro-emblem relative mx-auto aspect-square w-full max-w-[500px]"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div aria-hidden className="absolute inset-[10%] rounded-full bg-brand-gold/15 blur-3xl" />

      <motion.div
        aria-hidden
        className="absolute inset-[3%] rounded-full bg-white shadow-2xl shadow-brand-ink/10 ring-1 ring-brand-ink/5"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <motion.circle cx="200" cy="200" r="188" fill="none" stroke="var(--brand-red)" strokeWidth="10" strokeLinecap="round" {...draw(0.1)} />
        <motion.circle cx="200" cy="200" r="166" fill="none" stroke="var(--brand-gold)" strokeWidth="5" strokeLinecap="round" {...draw(0.35)} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center px-[10%]">
        <motion.div
          className="relative w-full overflow-hidden"
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.75, ease }}
        >
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, delay: 0.75, ease }}
          >
            <Image
              src="/web-logo-4.png"
              alt="ZOORO Hospitality Private Limited"
              width={2170}
              height={725}
              sizes="(min-width: 1024px) 400px, 80vw"
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Marquee() {
  const reduce = useReducedMotion();
  const items = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden bg-brand-red py-4 text-white">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-lg font-semibold">
            {t}
            <span className="h-2 w-2 rounded-full bg-brand-gold" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative mt-14">
      <div className="absolute left-0 right-0 top-5 hidden h-1 rounded bg-brand-ink/10 md:block" />
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="absolute left-0 right-0 top-5 hidden h-1 rounded bg-gradient-to-r from-brand-gold via-brand-red to-brand-leaf md:block"
      />
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        {steps.map((s, i) => (
          <li key={s.t}>
            <Reveal delay={i * 0.08}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-lg font-bold text-white ring-8 ring-brand-cream">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-brand-ink">{s.t}</h3>
              <p className="mt-2 text-brand-ink/70">{s.d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EnquiryForm() {
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
    "mt-1 w-full min-w-0 rounded-xl border border-brand-ink/15 bg-white px-3 py-2.5 text-brand-ink outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30 aria-[invalid=true]:border-brand-red aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-brand-red/20";
  const label = "text-sm font-semibold text-brand-ink";

  return (
    <form onSubmit={onSubmit} noValidate className="w-full min-w-0 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brand-ink/10 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={label}>Your name <span className="text-brand-red">*</span>
          <input
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="home-name-error"
            onChange={(e) => {
              sanitizeInput(e.currentTarget, sanitizeNameInput);
              clearError("name");
            }}
            className={field}
          />
          <FieldError id="home-name-error" message={errors.name} />
        </label>
        <label className={label}>Company
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            aria-invalid={Boolean(errors.company)}
            aria-describedby="home-company-error"
            onChange={() => clearError("company")}
            className={field}
          />
          <FieldError id="home-company-error" message={errors.company} />
        </label>
        <label className={label}>Phone <span className="text-brand-red">*</span>
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
            aria-describedby="home-phone-error"
            onChange={(e) => {
              sanitizeInput(e.currentTarget, sanitizePhoneInput);
              clearError("phone");
            }}
            className={field}
          />
          <FieldError id="home-phone-error" message={errors.phone} />
        </label>
        <label className={label}>Email <span className="text-brand-red">*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            maxLength={160}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="home-email-error"
            onChange={() => clearError("email")}
            className={field}
          />
          <FieldError id="home-email-error" message={errors.email} />
        </label>
      </div>
      <label className={`mt-3 block ${label}`}>What do you need?
        <select name="service" className={field}>
          <option>Corporate canteen</option>
          <option>Industrial catering</option>
          <option>Festival & occasion meals</option>
          <option>Events & buffets</option>
          <option>Healthy meals</option>
          <option>Food court</option>
          <option>Weddings & bulk catering</option>
          <option>Delivery kitchen</option>
        </select>
      </label>
      <label className={`mt-3 block ${label}`}>Message
        <textarea
          name="message"
          rows={3}
          maxLength={4000}
          className={field}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="home-message-error"
          onChange={() => clearError("message")}
          placeholder="Location, headcount, dates…"
        />
        <FieldError id="home-message-error" message={errors.message} />
      </label>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p key="e" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-medium text-brand-red">
            {error}
          </motion.p>
        )}
        {sent && !error && (
          <motion.p key="s" role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-3 rounded-xl bg-brand-leaf/10 p-3 text-sm font-medium text-brand-leaf-dark">
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
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 font-bold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Spinner tone="white" label="Sending enquiry" />}
        {loading ? "Sending…" : "Send enquiry"}
      </motion.button>
    </form>
  );
}

/* ---------- page ---------- */

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  } as const);

  return (
    <div className="bg-brand-cream text-brand-ink">
      {/* HERO */}
      <section ref={heroRef} className="zooro-hero relative isolate overflow-hidden">
        <motion.div style={{ y: blobY }} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-gold/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-leaf/20 blur-3xl" />
        </motion.div>

        <div className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.p {...line(0)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-red shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-leaf" />
              Corporate canteens, industrial catering, food courts and events
            </motion.p>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <motion.span className="block" {...line(0.1)}>Good food,</motion.span>
              <motion.span className="block text-brand-red" {...line(0.2)}>better people,</motion.span>
              <motion.span className="block" {...line(0.3)}>brighter workplaces.</motion.span>
            </h1>

            <motion.p {...line(0.45)} className="mt-6 max-w-xl text-lg text-brand-ink/75">
              ZOORO Hospitality runs fresh, hygienic canteens inside offices and factories, and serves
              festival and occasion meals for companies of every size.
            </motion.p>

            <motion.div {...line(0.6)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-block rounded-full bg-brand-red px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-red/30 transition-colors hover:bg-brand-red-dark">
                  Get a free quote
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/services" className="inline-block rounded-full border-2 border-brand-ink/80 px-7 py-3 font-bold transition-colors hover:bg-brand-ink hover:text-white">
                  See our services
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div style={{ y: logoY }}>
            <HeroLogo />
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* CLIENTS */}
      <section id="clients" className="scroll-mt-24 border-b border-brand-ink/10 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                Trusted by
              </p>
              <h2 className="mt-4 max-w-xl text-balance font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                Teams across Pune
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-ink/55 sm:text-base">
                From manufacturing campuses and IT parks to managed office spaces.
              </p>
            </div>
            <Link
              href="/about#clients"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              See all clients
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
          <ClientLogoMarquee />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-5xl">
            One kitchen partner for every kind of meal
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {serviceCards.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.08}
              className={`h-full ${service.className}`}
            >
              <Link
                href="/services"
                className="group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl bg-brand-ink p-7 text-white shadow-sm ring-1 ring-brand-ink/10 transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                {service.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={service.image}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  >
                    <source src={service.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}

                {/* Tint keeps the text readable and lets the brand colour show through. */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/45 to-brand-ink/10 transition-colors duration-300 group-hover:via-brand-ink/60" />

                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                    {service.title}
                  </h3>

                  {/* Revealed on hover / keyboard focus; always shown on small screens. */}
                  <div className="grid grid-rows-[1fr] transition-all duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm text-white/85 sm:text-base">
                        {service.description}
                      </p>
                      <span className="mt-4 inline-block font-bold text-brand-gold">
                        Learn more &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {additionalServices.map((service) => (
            <Link
              key={service.title}
              href="/services"
              className="group rounded-2xl bg-white p-5 ring-1 ring-brand-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-ink/5"
            >
              <p className="font-display text-base font-extrabold text-brand-ink group-hover:text-brand-red">
                {service.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink/60">
                {service.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-red">
                Explore
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FESTIVALS AND OCCASIONS */}
      <section id="festivals" className="relative scroll-mt-24 overflow-clip bg-brand-ink py-20 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-red/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-16">
            <Reveal className="flex flex-col justify-center">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                <span className="h-px w-8 bg-brand-gold" />
                Festivals &amp; occasions
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                Festival and occasion meals for your company
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
                From a festive thali for 50 to a buffet for 1,000+, we plan the menu, cook, serve and clean up.
                Any corporate meal, any occasion.
              </p>

              <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                    Festivals &amp; holidays
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {festiveOccasions.map((o) => (
                      <li key={o} className="flex items-center gap-2.5 text-sm font-medium text-white/80">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                    Company moments
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {companyOccasions.map((o) => (
                      <li key={o} className="flex items-center gap-2.5 text-sm font-medium text-white/80">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-red/20 transition-colors hover:bg-brand-red-dark"
                >
                  Plan your occasion
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white/80 transition-colors hover:border-brand-gold/60 hover:text-white"
                >
                  Explore menus
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="relative h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <Image
                  src="/Flaming wok stir-fry in a professional kitchen.png"
                  alt="Chef cooking a festive dish over an open flame"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-brand-ink/5" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-brand-gold">
                    Signature spreads
                  </p>
                  <p className="mt-2 max-w-xs font-display text-2xl font-extrabold leading-tight">
                    Thali to buffet, plated with care.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                    <div>
                      <p className="font-display text-2xl font-extrabold">50–1,000+</p>
                      <p className="text-xs text-white/55">guests per event</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-extrabold">End-to-end</p>
                      <p className="text-xs text-white/55">menu, service &amp; cleanup</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOD STORY */}
      <section className="relative isolate overflow-hidden bg-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        >
          <path
            d="M-40 80 C150 60 100 280 270 200 S420 50 350 40 C220 10 80 220 180 370 S330 550 170 610 M1480 60 C1260 10 1240 150 1320 250 S1460 360 1320 430 S1230 600 1320 560 S1450 400 1490 410"
            fill="none"
            stroke="var(--brand-red-light)"
            strokeOpacity=".28"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative mx-auto flex min-h-[570px] max-w-7xl items-center justify-center px-6 py-24 text-center sm:min-h-[620px]">
          <div className="relative z-10 max-w-xl">
            <p className="text-balance font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-red-light sm:text-5xl lg:text-6xl">
              Better food for more people
            </p>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-brand-ink/65 sm:text-lg">
              Freshly prepared meals, thoughtful menus and dependable service for teams of every size.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="absolute left-[-1.5rem] top-[10%] aspect-square w-24 rotate-[-8deg] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-ink/5 sm:left-[7%] sm:top-[16%] sm:w-32 lg:left-[10%] lg:w-40"
          >
            <Image src="/helthy-food.png" alt="" fill sizes="(min-width: 1024px) 160px, 128px" className="object-cover" />
          </div>

          <div
            aria-hidden="true"
            className="absolute right-[-1.5rem] top-[12%] aspect-[4/3] w-28 rotate-[7deg] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-ink/5 sm:right-[8%] sm:top-[9%] sm:w-40 lg:right-[12%] lg:w-48"
          >
            <Image src="/bhuffi.png" alt="" fill sizes="(min-width: 1024px) 192px, 160px" className="object-cover" />
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-[8%] left-[2%] hidden aspect-[4/3] w-40 -rotate-[6deg] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-ink/5 sm:block lg:bottom-[10%] lg:left-[14%] lg:w-52"
          >
            <Image src="/Flaming wok stir-fry in a professional kitchen.png" alt="" fill sizes="(min-width: 1024px) 208px, 160px" className="object-cover" />
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-[8%] right-[3%] hidden aspect-[16/10] w-44 rotate-[5deg] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-ink/5 md:block lg:bottom-[12%] lg:right-[10%] lg:w-56"
          >
            <Image src="/corparate-canteen.png" alt="" fill sizes="(min-width: 1024px) 224px, 176px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative overflow-clip bg-brand-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                Why ZOORO
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                Why companies choose ZOORO
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-xl text-base text-brand-ink/60 sm:text-lg lg:ml-auto">
                Four promises we build into every kitchen — from the first hygiene check of the day to the invoice at month end.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {why.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.t} delay={(i % 2) * 0.08}>
                  <article className="group relative isolate h-full overflow-clip rounded-3xl bg-white p-7 ring-1 ring-brand-ink/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-ink/5 hover:ring-brand-ink/15">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-1/2 z-0 -translate-y-1/2 text-brand-ink/10 transition-all duration-500 ease-out md:scale-75 md:opacity-0 md:group-hover:scale-100 md:group-hover:rotate-12 md:group-hover:opacity-100"
                    >
                      <Icon className="h-28 w-28" />
                    </span>

                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${w.tint}`}>
                        <Icon />
                      </span>
                      <span className="font-display text-sm font-bold tracking-wider text-brand-ink/20">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="mt-6 text-xl font-extrabold">{w.t}</h3>
                      <p className="mt-2 text-brand-ink/65">{w.d}</p>

                      <span className={`mt-6 block h-1 w-10 rounded-full ${w.c} transition-all duration-300 group-hover:w-16`} />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-5xl">How it works</h2>
          </Reveal>
          <div className="[&_span.ring-brand-cream]:ring-white">
            <Steps />
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="enquiry" className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Reveal className="min-w-0">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-red">Get in touch</p>
            <h2 className="max-w-md font-display text-3xl font-extrabold sm:text-4xl">Let’s plan your next meal</h2>
            <p className="mt-4 max-w-md text-base text-brand-ink/70 sm:text-lg">
              Tell us about your team or your occasion and we will reply with a menu and quotation.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-brand-ink/70 sm:text-base">
              {contact.company}<br />
              {contact.addressLines[0]}<br />
              {contact.addressLines[1]}<br />
              {contact.phones.map((phone, index) => (
                <span key={phone.href}>
                  <a href={phone.href} className="font-semibold text-brand-red hover:underline">
                    {phone.display}
                  </a>
                  {index === 0 ? " / " : ""}
                </span>
              ))}
              <br />
              <a href={`mailto:${contact.email}`} className="font-semibold text-brand-red hover:underline">
                {contact.email}
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}