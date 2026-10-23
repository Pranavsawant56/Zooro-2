"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- icons ---------- */

function IconSliders({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h10M18 18h2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );
}

function IconShield({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3 19 6v6c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
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

function IconLeaf({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 4C13 4 7 7.5 7 14a5 5 0 0 0 5 5c6.5 0 8-6 8-15Z" />
      <path d="M4 21c2.5-5 6-8 11-10" />
    </svg>
  );
}

/* ---------- data ---------- */

const heroImages = [
  {
    src: "/corparate-canteen.png",
    alt: "A ZOORO corporate canteen counter",
    label: "Corporate canteen",
  },
  {
    src: "/Flaming wok stir-fry in a professional kitchen.png",
    alt: "A chef cooking over an open flame",
    label: "Industrial catering",
  },
  {
    src: "/bhuffi.png",
    alt: "A ZOORO buffet spread",
    label: "Events & buffets",
  },
  {
    src: "/helthy-food.png",
    alt: "A healthy ZOORO meal",
    label: "Healthy meals",
  },
];

const services = [
  {
    id: "canteen",
    number: "01",
    title: "Corporate canteen",
    short: "Office dining, every day",
    kicker: "On-site daily dining",
    caption: "Your canteen, run by us.",
    summary: "A full canteen inside your office, run by our team.",
    image: "/corparate-canteen.png",
    imageAlt: "The ZOORO corporate canteen serving counter",
    stat: "QR",
    statLabel: "scan & serve",
    points: [
      "Breakfast, lunch, snacks and dinner",
      "Weekly or 4-week cyclic menus with veg, non-veg, Jain and egg options",
      "Employees pre-book or opt out on their phone before a cut-off time",
      "QR meal pass scanned at the counter, with live booked and served counts",
      "Company and employee subsidy splits handled automatically",
    ],
    tags: ["Pre-booking", "QR meal pass", "Subsidy rules"],
    tint: "bg-brand-red/10 text-brand-red",
    bar: "bg-brand-red",
    chip: "bg-brand-red/10 text-brand-red",
  },
  {
    id: "industrial",
    number: "02",
    title: "Industrial catering",
    short: "Plants & shift teams",
    kicker: "Factories & plants",
    caption: "Built for shift after shift.",
    summary: "High-volume meals for factories, plants and shift teams.",
    image: "/Flaming wok stir-fry in a professional kitchen.png",
    imageAlt: "A chef cooking in a high-volume ZOORO kitchen",
    stat: "Multi-shift",
    statLabel: "day & night",
    points: [
      "Breakfast, lunch, snacks, dinner and night-shift meals",
      "Large kitchens with strict quality and hygiene routines",
      "Fast counters that keep serving even when the internet drops",
      "Every meal recorded, so monthly billing is accurate and undisputed",
      "Rate cards per site and meal type",
    ],
    tags: ["Multi-shift", "Night shift", "Offline-safe counter"],
    tint: "bg-brand-ink/5 text-brand-ink",
    bar: "bg-brand-ink",
    chip: "bg-brand-ink/5 text-brand-ink",
  },
  {
    id: "festival",
    number: "03",
    title: "Festival and occasion meals",
    short: "Festive menus",
    kicker: "Festivals & occasions",
    caption: "A spread worth gathering for.",
    summary: "Corporate meals for festivals and every special day.",
    image: "/Flaming wok stir-fry in a professional kitchen.png",
    imageAlt: "A festive dish being cooked over an open flame",
    stat: "50–5,000",
    statLabel: "guests per event",
    points: [
      "Festive menus for Diwali, Eid, Christmas, Pongal, Sankranti and New Year",
      "National days, annual days, birthdays, farewells and client meets",
      "Special menus and paid add-ons such as sweets and beverages",
      "From a thali for 50 to a buffet for thousands",
      "Any corporate meal requirement, big or small",
    ],
    tags: ["Festival menus", "Annual days", "Any occasion"],
    tint: "bg-brand-gold/15 text-brand-gold",
    bar: "bg-brand-gold",
    chip: "bg-brand-gold/15 text-brand-ink",
  },
  {
    id: "events",
    number: "04",
    title: "Events and buffets",
    short: "Conferences & celebrations",
    kicker: "Events & buffets",
    caption: "From setup to cleanup.",
    summary: "Conferences, trainings, launches and celebrations.",
    image: "/bhuffi.png",
    imageAlt: "A ZOORO buffet spread for a corporate event",
    stat: "Silver–Platinum",
    statLabel: "menu packages",
    points: [
      "Per-plate packages in Silver, Gold and Platinum, with add-ons",
      "Clear quotation with GST and terms, plus revisions if your plan changes",
      "Booking confirmation with an advance and a payment link",
      "A job sheet covering menu, staff, equipment, transport and timeline",
      "Final guest count locked in before the day",
    ],
    tags: ["Menu packages", "Quotation", "Advance booking"],
    tint: "bg-brand-red/10 text-brand-red",
    bar: "bg-brand-red",
    chip: "bg-brand-red/10 text-brand-red",
  },
  {
    id: "healthy",
    number: "05",
    title: "Healthy meal plans",
    short: "Balanced & labelled",
    kicker: "Healthy by design",
    caption: "Balanced, labelled, consistent.",
    summary: "Balanced meals designed around wellbeing.",
    image: "/helthy-food.png",
    imageAlt: "A balanced ZOORO healthy meal",
    stat: "Per dish",
    statLabel: "calories & allergens",
    points: [
      "Calories, protein, carbs and fat shown for every portion",
      "Allergen tags and a Healthy badge on suitable dishes",
      "Diet, high-protein and diabetic-friendly options",
      "Subscription plans for teams and individuals",
      "Recipes standardised across sites for consistent quality",
    ],
    tags: ["Nutrition info", "Allergen tags", "Subscriptions"],
    tint: "bg-brand-leaf/10 text-brand-leaf",
    bar: "bg-brand-leaf",
    chip: "bg-brand-leaf/10 text-brand-leaf",
  },
];

const standards = [
  {
    title: "Made for your operation",
    description:
      "From daily office canteens to multi-shift plants and one-day events, menus and service are planned around your team.",
    icon: IconSliders,
    tint: "bg-brand-red/10 text-brand-red",
    bar: "bg-brand-red",
  },
  {
    title: "Quality you can count on",
    description:
      "Standardised recipes and consistent kitchen routines help keep every meal reliable across people, shifts and sites.",
    icon: IconShield,
    tint: "bg-brand-gold/15 text-brand-gold",
    bar: "bg-brand-gold",
  },
  {
    title: "Clear from planning to billing",
    description:
      "Know what is on the menu, what service includes and how meals are counted before the invoice arrives.",
    icon: IconReceipt,
    tint: "bg-brand-ink/5 text-brand-ink",
    bar: "bg-brand-ink",
  },
  {
    title: "Food for different needs",
    description:
      "Choose from vegetarian, Jain, non-vegetarian and health-focused options, with nutrition and allergen details where needed.",
    icon: IconLeaf,
    tint: "bg-brand-leaf/10 text-brand-leaf",
    bar: "bg-brand-leaf",
  },
];

const steps = [
  { t: "Tell us your need", d: "Share headcount, location, meal timings or the occasion." },
  { t: "We plan the menu", d: "Weekly cycles or a festival menu, with nutrition and allergen tags." },
  { t: "We cook and serve", d: "Trained staff, a hygienic kitchen and a fast scan-and-serve counter." },
  { t: "You review", d: "Ratings, feedback and clear monthly invoices keep everyone aligned." },
];

/* ---------- page ---------- */

export default function ServicesContent() {
  const [active, setActive] = useState(services[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = services.find((s) => s.id === active)!;

  function select(index: number, focus = false) {
    setActive(services[index].id);
    if (focus) tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % services.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + services.length) % services.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = services.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    select(nextIndex, true);
  }

  return (
    <div className="bg-brand-cream text-brand-ink">
      {/* HERO */}
      <section className="relative isolate overflow-clip">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-gold/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-leaf/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-red shadow-sm">
                <span className="h-2 w-2 rounded-full bg-brand-leaf" />
                Our services
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">One kitchen.</span>
                <span className="block text-brand-red">Every kind of meal.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg text-brand-ink/75">
                From the daily office canteen to plant shifts, festival spreads, events and healthy
                plans, ZOORO plans, cooks and serves it end to end.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-brand-red px-7 py-3.5 text-center font-bold text-white shadow-lg shadow-brand-red/25 transition-colors hover:bg-brand-red-dark"
                >
                  Plan your requirement
                </Link>
                <a
                  href="#services"
                  className="inline-block rounded-full border-2 border-brand-ink/80 px-7 py-3 text-center font-bold transition-colors hover:bg-brand-ink hover:text-white"
                >
                  Explore the five services
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink/45">
                Pune-based &middot; Offices, plants and occasions
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="relative">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {heroImages.map((image, i) => (
                  <div
                    key={image.src}
                    className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-lg shadow-brand-ink/10 ring-1 ring-brand-ink/10 ${
                      i % 2 === 0 ? "-rotate-1" : "rotate-1"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={i < 2}
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 280px, 48vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/10 to-transparent" />
                    <p className="absolute inset-x-0 bottom-0 p-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:p-4">
                      {image.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-3 shadow-xl ring-1 ring-brand-ink/10">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-ink">
                  <span className="h-2 w-2 rounded-full bg-brand-gold" />
                  Five services &middot; one partner
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE EXPLORER */}
      <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                What we offer
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                Five services, one accountable partner
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-xl text-base text-brand-ink/60 sm:text-lg lg:ml-auto">
                Pick a service to see what is included, who it is for and how we run it. Every service
                can be tailored to your site and your team.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-10">
            <div
              role="tablist"
              aria-label="Our services"
              className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0"
            >
            {services.map((service, index) => {
              const isActive = service.id === active;
              return (
                <button
                  key={service.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${service.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${service.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`relative shrink-0 snap-start overflow-hidden rounded-2xl px-4 py-3 text-left outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold lg:flex lg:min-h-[96px] lg:flex-col lg:justify-between lg:px-5 lg:py-4 ${
                    isActive
                      ? "text-white ring-brand-ink"
                      : "bg-brand-cream text-brand-ink ring-brand-ink/10 hover:ring-brand-ink/25"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-tab"
                      className="absolute inset-0 rounded-2xl bg-brand-ink"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-display text-[10px] font-bold tracking-wider ${
                      isActive ? "text-brand-gold" : "text-brand-ink/30"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="relative z-10 mt-1 block whitespace-nowrap font-display text-sm font-extrabold lg:whitespace-normal lg:text-base">
                    {service.title}
                  </span>
                  <span
                    className={`relative z-10 mt-1 hidden text-xs lg:block ${
                      isActive ? "text-white/60" : "text-brand-ink/50"
                    }`}
                  >
                    {service.short}
                  </span>
                </button>
              );
            })}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent lg:hidden"
            />
          </div>

          <div className="mt-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                role="tabpanel"
                id={`panel-${current.id}`}
                aria-labelledby={`tab-${current.id}`}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-brand-ink/10"
              >
                <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative aspect-[16/10] min-h-[260px] overflow-hidden bg-brand-ink lg:aspect-auto lg:min-h-[540px]">
                    <Image
                      src={current.image}
                      alt={current.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 500px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/30 to-brand-ink/5" />

                    <div className="absolute right-4 top-4 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur-sm">
                      <p className="font-display text-lg font-extrabold text-white">{current.stat}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                        {current.statLabel}
                      </p>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                        {current.kicker}
                      </p>
                      <p className="mt-2 max-w-xs font-display text-2xl font-extrabold leading-tight text-white">
                        {current.caption}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl font-display text-sm font-bold ${current.tint}`}
                      >
                        {current.number}
                      </span>
                      <span className="rounded-full bg-brand-cream px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-ink/45">
                        What&rsquo;s included
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">
                      {current.title}
                    </h3>
                    <p className="mt-3 text-base text-brand-ink/65 sm:text-lg">{current.summary}</p>

                    <ul className="mt-6 space-y-3 text-[15px] sm:text-base">
                      {current.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${current.bar}`} />
                          <span className="text-brand-ink/75">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${current.chip}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-8">
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 font-bold text-white shadow-lg shadow-brand-red/20 transition-colors hover:bg-brand-red-dark"
                      >
                        Get a quote for this
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* STANDARD */}
      <section className="bg-brand-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                The ZOORO standard
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                A meal service that works for your people
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-xl text-base text-brand-ink/60 sm:text-lg lg:ml-auto">
                Good food is only part of the job. We make planning, service and follow-through easier
                too.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {standards.map((standard, i) => {
              const Icon = standard.icon;
              return (
                <Reveal key={standard.title} delay={(i % 2) * 0.08} className="h-full">
                  <article className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-brand-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-ink/5">
                    <div className="flex items-start justify-between gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${standard.tint}`}>
                        <Icon />
                      </span>
                      <span className="font-display text-sm font-bold tracking-wider text-brand-ink/20">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold">{standard.title}</h3>
                    <p className="mt-2 text-brand-ink/65">{standard.description}</p>
                    <div className="mt-auto pt-6">
                      <span
                        className={`block h-1 w-10 rounded-full ${standard.bar} transition-all duration-300 group-hover:w-16`}
                      />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                How it works
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                From first call to final invoice
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-xl text-base text-brand-ink/60 sm:text-lg lg:ml-auto">
                A simple, transparent process that keeps your team fed and your accounts clear.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-brand-ink/10 lg:block" />
            {steps.map((step, i) => (
              <Reveal key={step.t} delay={i * 0.06}>
                <div className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-cream font-display text-sm font-bold text-brand-red ring-4 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold">{step.t}</h3>
                  <p className="mt-2 text-sm text-brand-ink/65 sm:text-base">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-clip bg-brand-ink py-20 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-red/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
        </div>

        <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
            Let&rsquo;s get started
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold sm:text-5xl">
            Tell us what your team needs.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
            Share your headcount, location and meal timings, and we will come back with a menu and a
            clear quotation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-brand-gold px-8 py-3.5 font-bold text-brand-ink transition-colors hover:bg-white"
            >
              Get a free quote
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-brand-gold/60 hover:bg-white/5"
            >
              Talk to our team
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Corporate canteens &middot; Industrial catering &middot; Festivals &middot; Events &middot;
            Healthy meals
          </p>
          <p className="mt-4 text-sm text-white/60">
            <a href="mailto:sagar@zoorohospitality.com" className="font-semibold text-white hover:underline">
              sagar@zoorohospitality.com
            </a>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
