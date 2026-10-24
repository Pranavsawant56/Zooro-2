import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ZOORO Hospitality in Pune for corporate canteens, industrial catering, festival meals, events, healthy meals, food courts, weddings, bulk catering and delivery kitchen services. Call +91 97633 72666 or email sagar@zoorohospitality.com.",
};

const helpWith = [
  "Corporate canteen",
  "Industrial catering",
  "Festival & occasion meals",
  "Events & buffets",
  "Healthy meals",
  "Food court",
  "Weddings & bulk catering",
  "Delivery kitchen",
];

const nextSteps = [
  {
    title: "Share your requirement",
    description: "Headcount, location, meal timings or the occasion — whatever you know so far.",
  },
  {
    title: "We plan and price",
    description: "A menu, service plan and a clear quotation built around your site.",
  },
  {
    title: "We confirm and serve",
    description: "A start date, a briefed team and a service you can count on.",
  },
];

const mapLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("ZOORO Hospitality, Maruti Nagar, Wadgaonsheri, Pune 411014");

/* ---------- icons ---------- */

function IconMail({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconPhone({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 3.5 9 3l1.8 4.2-2 1.4a13 13 0 0 0 6.6 6.6l1.4-2L21 15l-.5 2.5A2.5 2.5 0 0 1 18 19.5C10.5 19.5 4.5 13.5 4.5 6A2.5 2.5 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

function IconPin({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconGlobe({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
    </svg>
  );
}

function IconUtensils({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3v7M3 3v4a3 3 0 0 0 6 0V3M6 10v11" />
      <path d="M17 3v18M17 3c2.5 1.4 4 3.9 4 7 0 2.3-1.5 4-4 4" />
    </svg>
  );
}

function IconArrowUpRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/* ---------- page ---------- */

export default function ContactPage() {
  return (
    <div className="bg-brand-cream text-brand-ink">
      {/* HERO */}
      <section className="relative isolate overflow-clip">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-gold/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-leaf/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-red shadow-sm">
                <span className="h-2 w-2 rounded-full bg-brand-leaf" />
                Get in touch
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">Let&rsquo;s plan</span>
                <span className="block text-brand-red">your next meal.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg text-brand-ink/75">
                Tell us about your team, your site or your occasion. We will reply with a menu and a
                clear quotation.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enquiry"
                  className="inline-block rounded-full bg-brand-red px-7 py-3.5 text-center font-bold text-white shadow-lg shadow-brand-red/25 transition-colors hover:bg-brand-red-dark"
                >
                  Start an enquiry
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block rounded-full border-2 border-brand-ink/80 px-7 py-3 text-center font-bold transition-colors hover:bg-brand-ink hover:text-white"
                >
                  Email us
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-4 text-sm font-semibold text-brand-ink/60">
                Or call{" "}
                {contact.phones.map((phone, index) => (
                  <span key={phone.href}>
                    <a href={phone.href} className="text-brand-red hover:underline">
                      {phone.display}
                    </a>
                    {index === 0 ? " / " : ""}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink/45">
                Pune-based &middot; Offices, plants and occasions
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="relative">
            <div className="relative mx-auto w-full max-w-lg pb-8 lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-brand-ink/10 ring-1 ring-brand-ink/10">
                <Image
                  src="/corparate-canteen.png"
                  alt="A ZOORO corporate canteen ready for service"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-ink backdrop-blur">
                  Inside a ZOORO canteen
                </span>
              </div>

              <a
                href={`mailto:${contact.email}`}
                className="group absolute -bottom-2 left-4 right-4 z-10 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-ink/10 sm:-left-6 sm:right-auto sm:w-[330px] sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <IconMail />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-ink/40">
                    Email us directly
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-bold text-brand-ink group-hover:text-brand-red">
                    {contact.email}
                  </span>
                </span>
                <IconArrowUpRight className="ml-auto h-5 w-5 text-brand-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="enquiry" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                Tell us what you need
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                A few details, and we&rsquo;ll take it from here.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-xl text-base text-brand-ink/60 sm:text-lg lg:ml-auto">
                Share your headcount, location and what you have in mind. If you are not sure yet,
                tell us that too.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div id="contact-cards" className="order-2 grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
              <Reveal className="h-full">
                <div className="h-full rounded-3xl bg-brand-red p-6 text-white shadow-lg shadow-brand-red/20 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                      <IconMail />
                    </span>
                    <h2 className="text-lg font-extrabold">Email</h2>
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-5 block break-all font-display text-lg font-bold text-brand-gold hover:underline sm:text-xl"
                  >
                    {contact.email}
                  </a>
                  <p className="mt-2 text-sm text-white/70">
                    Best for menus, tenders and quotations.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="h-full">
                <div className="h-full rounded-3xl bg-brand-gold p-6 text-brand-ink shadow-sm ring-1 ring-brand-ink/10 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/45">
                      <IconPhone />
                    </span>
                    <h2 className="text-lg font-extrabold">Call us</h2>
                  </div>
                  <div className="mt-5 space-y-1.5">
                    {contact.phones.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="block font-display text-lg font-extrabold hover:underline sm:text-xl"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-brand-ink/65">
                    {contact.director}, Director. Best for urgent requirements and site visits.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="h-full">
                <div className="h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-ink/10 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-ink">
                      <IconPin />
                    </span>
                    <h2 className="text-lg font-extrabold">Head office</h2>
                  </div>
                  <address className="mt-4 not-italic text-brand-ink/70">
                    {contact.company}
                    <br />
                    {contact.addressLines[0]}
                    <br />
                    {contact.addressLines[1]}
                  </address>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline"
                  >
                    Open in Google Maps
                    <IconArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.18} className="h-full">
                <a
                  href={contact.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-ink/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-leaf/10 text-brand-leaf">
                    <IconGlobe />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-extrabold">Website</span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-brand-red">
                      {contact.website}
                    </span>
                  </span>
                  <IconArrowUpRight className="h-5 w-5 text-brand-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>

              <Reveal delay={0.24} className="h-full sm:col-span-2 lg:col-span-1">
                <div className="h-full rounded-3xl bg-brand-ink p-6 text-white sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-gold">
                      <IconUtensils />
                    </span>
                    <h2 className="text-lg font-extrabold">We can help with</h2>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {helpWith.map((h, i) => (
                      <li
                        key={h}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          i % 3 === 0
                            ? "bg-brand-red text-white"
                            : i % 3 === 1
                              ? "bg-brand-gold text-brand-ink"
                              : "bg-brand-leaf text-white"
                        }`}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-gold hover:underline"
                  >
                    Explore all services <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08} className="order-1 min-w-0 lg:order-2">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section id="process" className="relative scroll-mt-24 overflow-clip bg-brand-ink py-20 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-red/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                <span className="h-px w-8 bg-brand-gold" />
                What happens next
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                From your first message to a menu on the table.
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/60 sm:text-lg">
                One team handles the menu, the service and the invoice, so nothing gets lost along the
                way.
              </p>
            </Reveal>

            <div className="mt-9 space-y-6">
              {nextSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 font-display text-sm font-bold text-brand-gold ring-1 ring-white/15">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold">{step.title}</h3>
                      <p className="mt-1 text-sm text-white/60 sm:text-base">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <div className="mt-8 space-y-2 text-sm text-white/55">
                <p>
                  Prefer to talk?{" "}
                  {contact.phones.map((phone, index) => (
                    <span key={phone.href}>
                      <a href={phone.href} className="font-semibold text-brand-gold hover:underline">
                        {phone.display}
                      </a>
                      {index === 0 ? " / " : ""}
                    </span>
                  ))}
                </p>
                <p>
                  Prefer email?{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold text-brand-gold hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/30 ring-1 ring-white/10">
                <Image
                  src="/Flaming wok stir-fry in a professional kitchen.png"
                  alt="A ZOORO chef cooking fresh food in a professional kitchen"
                  fill
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                    Fresh from our kitchens
                  </p>
                  <p className="mt-1.5 max-w-xs font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                    Cooked fresh, served with care.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-white p-5 text-brand-ink shadow-xl ring-1 ring-brand-ink/10 sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-ink/40">
                  One team
                </p>
                <p className="mt-1 font-display text-lg font-extrabold">Menus to invoices.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
