import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us | ZOORO Hospitality",
  description:
    "ZOORO Hospitality runs corporate canteens, industrial catering, events and healthy meals from Pune. Good food, better people, brighter workplaces.",
};

/* ---------- icons ---------- */

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconChefHat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M17 21H7a1 1 0 0 1-1-1v-5.35c0-.46.32-.84.73-1.04a4 4 0 0 1 2.13-7.59 5 5 0 0 1 9.19 0 4 4 0 0 1 2.13 7.59c.41.2.73.58.73 1.04V20a1 1 0 0 1-1 1Z" />
      <path d="M6 17h12" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3 19 6v6c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

/* ---------- data ---------- */

const stats = [
  { value: "On-site", label: "kitchens, cooked fresh" },
  { value: "Multi-shift", label: "day and night coverage" },
  { value: "FSSAI-ready", label: "hygiene and audit processes" },
  { value: "End-to-end", label: "menu, service and cleanup" },
];

const pillars = [
  {
    title: "Our mission",
    description:
      "To serve fresh, hygienic and healthy food at the workplace, cooked to real demand so nothing is wasted.",
    icon: IconTarget,
    tint: "bg-brand-red/10 text-brand-red",
    bar: "bg-brand-red",
  },
  {
    title: "Our vision",
    description:
      "Workplaces where a good meal is something people look forward to every day.",
    icon: IconEye,
    tint: "bg-brand-gold/15 text-brand-gold",
    bar: "bg-brand-gold",
  },
  {
    title: "Our values",
    description:
      "Hygiene, honesty and care for people, in the kitchen, at the counter and on every invoice.",
    icon: IconHeart,
    tint: "bg-brand-leaf/10 text-brand-leaf",
    bar: "bg-brand-leaf",
  },
];

const whatWeDo = [
  {
    title: "Corporate canteens",
    text: "We run the canteen inside your office, with daily menus, trained staff and a quick counter.",
  },
  {
    title: "Industrial catering",
    text: "Large-scale, multi-shift meals for factories and plants, night shift included.",
  },
  {
    title: "Festival and occasion meals",
    text: "Special menus for festivals, annual days, client meets and any corporate occasion.",
  },
  {
    title: "Events and buffets",
    text: "Menu packages, quotation and service for conferences, trainings and celebrations.",
  },
  {
    title: "Healthy meal plans",
    text: "Balanced meals with nutrition and allergen information on every dish.",
  },
];

const approach = [
  {
    t: "We cook to real demand",
    d: "Employees pre-book or opt out before a cut-off, so we prepare the right amount.",
    icon: IconChefHat,
    tint: "bg-brand-red/10 text-brand-red",
  },
  {
    t: "We keep kitchens audit-ready",
    d: "Daily hygiene checklists, temperature logs, food sample records and licence tracking.",
    icon: IconShield,
    tint: "bg-brand-gold/15 text-brand-gold",
  },
  {
    t: "We standardise quality",
    d: "Every dish follows a recipe, so the food tastes the same at every site.",
    icon: IconCheckCircle,
    tint: "bg-brand-leaf/10 text-brand-leaf",
  },
  {
    t: "We bill transparently",
    d: "Invoices come from meals actually served, with date-wise and employee-wise counts.",
    icon: IconReceipt,
    tint: "bg-brand-ink/5 text-brand-ink",
  },
];

/* ---------- page ---------- */

export default function AboutPage() {
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
                About ZOORO Hospitality
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Food for a <span className="text-brand-red">better tomorrow</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg text-brand-ink/75">
                ZOORO Hospitality is a Pune-based food service company. We feed the people who work in offices and
                factories, and we cater the occasions that bring them together.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-brand-red px-7 py-3.5 text-center font-bold text-white shadow-lg shadow-brand-red/25 transition-colors hover:bg-brand-red-dark"
                >
                  Work with us
                </Link>
                <Link
                  href="/services"
                  className="inline-block rounded-full border-2 border-brand-ink/80 px-7 py-3 text-center font-bold transition-colors hover:bg-brand-ink hover:text-white"
                >
                  See our services
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-brand-ink/45">
                Pune-based &middot; Corporate canteens &middot; Industrial catering &middot; Events
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-ink shadow-2xl shadow-brand-ink/15 ring-1 ring-brand-ink/10">
                <Image
                  src="/Flaming wok stir-fry in a professional kitchen.png"
                  alt="A ZOORO chef cooking over an open flame"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-brand-gold">Our kitchen</p>
                  <p className="mt-2 max-w-xs font-display text-2xl font-extrabold leading-tight text-white">
                    Cooked fresh, close to your team.
                  </p>
                </div>
              </div>

              <div className="absolute -right-4 top-6 hidden w-44 overflow-hidden rounded-2xl bg-white p-2 shadow-xl ring-1 ring-brand-ink/10 sm:block lg:-right-6 lg:top-8 lg:w-52">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/corparate-canteen.png"
                    alt="A ZOORO corporate canteen"
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                </div>
                <p className="px-2 pb-1 pt-2 text-[11px] font-bold text-brand-ink">Inside a ZOORO canteen</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-red text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.value} delay={i * 0.05} className="bg-brand-red px-4 py-6 sm:px-6">
                <p className="font-display text-lg font-extrabold sm:text-xl">{s.value}</p>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
              <span className="h-px w-8 bg-brand-red" />
              Who we are
            </p>
            <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
              A food partner built around your workplace
            </h2>
            <p className="mt-5 max-w-xl text-base text-brand-ink/70 sm:text-lg">
              We run kitchens and canteens inside our clients&rsquo; premises, so the food is cooked fresh, close to the
              people who eat it. Our work spans corporate canteens, industrial catering, events and buffets, and
              healthy meal plans.
            </p>
            <p className="mt-4 max-w-xl text-base text-brand-ink/70 sm:text-lg">
              Good food makes better people, and better people build brighter workplaces. That belief shapes how we
              plan menus, how we run our kitchens and how we serve every plate.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="mx-auto w-full max-w-lg lg:max-w-none">
              <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-brand-ink/5 ring-1 ring-brand-ink/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/corparate-canteen.png"
                    alt="A ZOORO corporate canteen"
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 640px) 512px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative z-10 mx-4 -mt-10 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-brand-ink/10 sm:mx-8">
                <p className="font-display text-xl font-extrabold leading-snug text-brand-red">
                  &ldquo;Good food, better people, brighter workplaces.&rdquo;
                </p>
                <div className="mt-4 h-1 w-12 rounded bg-brand-gold" />
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-ink/45">
                  Head office
                </p>
                <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">
                  ZOORO Hospitality Pvt. Ltd.
                  <br />
                  S.No. 52-3/1, Maruti Nagar, Lane No. 4,
                  <br />
                  Wadgaonsheri, Pune 411014
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" />
                What drives us
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                Mission, vision and values
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-xl text-base text-brand-ink/60 sm:text-lg lg:ml-auto">
                The principles behind every menu we plan, every plate we serve and every invoice we send.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.08} className="h-full">
                  <article className="group flex h-full flex-col overflow-clip rounded-3xl bg-brand-cream p-7 ring-1 ring-brand-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-ink/5">
                    <div className="flex items-start justify-between gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.tint}`}>
                        <Icon />
                      </span>
                      <span className="font-display text-sm font-bold tracking-wider text-brand-ink/20">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-extrabold">{p.title}</h3>
                    <p className="mt-2 text-brand-ink/65">{p.description}</p>
                    <div className="mt-auto pt-6">
                      <span className={`block h-1 w-10 rounded-full ${p.bar} transition-all duration-300 group-hover:w-16`} />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative overflow-clip bg-brand-ink py-20 text-white sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-red/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                <span className="h-px w-8 bg-brand-gold" />
                What we do
              </p>
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                Five ways we show up for your team
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
                From the daily canteen counter to the biggest festival on your calendar, one partner handles the
                food, the service and the cleanup.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-red/20 transition-colors hover:bg-brand-red-light"
                >
                  Explore services
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white/80 transition-colors hover:border-brand-gold/60 hover:text-white"
                >
                  Talk to us
                </Link>
              </div>
            </Reveal>

            <ul className="divide-y divide-white/10 border-y border-white/10">
              {whatWeDo.map((w, i) => (
                <li key={w.title}>
                  <Reveal delay={i * 0.05}>
                    <div className="group grid grid-cols-[auto_1fr] gap-5 py-6">
                      <span className="pt-1 font-display text-sm font-bold text-brand-gold/80">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-extrabold transition-colors group-hover:text-brand-gold sm:text-xl">
                          {w.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/65 sm:text-base">{w.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
              <span className="h-px w-8 bg-brand-red" />
              How we work
            </p>
            <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
              A kitchen you can audit, a bill you can verify
            </h2>
            <p className="mt-5 max-w-xl text-base text-brand-ink/70 sm:text-lg">
              Good food is only half the job. The other half is running a kitchen that is safe, consistent and
              honest about what it served.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 font-bold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              Talk to our team <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>

          <div className="divide-y divide-brand-ink/10 border-y border-brand-ink/10">
            {approach.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.t} delay={i * 0.05}>
                  <div className="flex gap-5 py-6">
                    <span className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${a.tint}`}>
                      <Icon />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold">{a.t}</h3>
                      <p className="mt-1 text-sm text-brand-ink/65 sm:text-base">{a.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-clip bg-gradient-to-br from-brand-red to-brand-red-dark py-20 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-ink/20 blur-3xl" />
        </div>

        <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
            Let&rsquo;s work together
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold sm:text-5xl">
            Want ZOORO in your workplace?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Tell us about your team or your occasion and we will reply with a menu and quotation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-brand-gold px-8 py-3.5 font-bold text-brand-ink transition-colors hover:bg-white"
            >
              Get a free quote
            </Link>
            <Link
              href="/services"
              className="inline-block rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Explore services
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/70">
            <a
              href="mailto:sagar@zoorohospitality.com"
              className="font-semibold text-white hover:underline"
            >
              sagar@zoorohospitality.com
            </a>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
