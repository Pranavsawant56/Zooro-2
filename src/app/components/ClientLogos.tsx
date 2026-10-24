"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { clients, type Client } from "@/lib/site";

function ClientMark({
  client,
  compact = false,
  color = false,
}: {
  client: Client;
  compact?: boolean;
  color?: boolean;
}) {
  if (!client.logo) {
    return (
      <span
        aria-hidden="true"
        className={`font-display font-extrabold tracking-[0.16em] text-brand-ink/65 ${
          compact ? "text-base" : "text-xl"
        }`}
      >
        {client.mark ?? client.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span className={`relative block w-full ${compact ? "h-12" : "h-16"}`}>
      <Image
        src={client.logo}
        alt={`${client.name} logo`}
        fill
        sizes={compact ? "160px" : "300px"}
        className={`object-contain transition duration-300 ${
          color
            ? "opacity-90 group-hover:opacity-100"
            : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
        }`}
      />
    </span>
  );
}

export function ClientLogoStrip() {
  return (
    <ul aria-label="Selected clients" className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      {clients.map((client) => (
        <li
          key={`${client.name}-${client.location}`}
          className="group flex h-20 items-center justify-center rounded-2xl bg-white px-4 shadow-sm ring-1 ring-brand-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <ClientMark client={client} compact />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogoMarquee() {
  const reduce = useReducedMotion();
  const items = [...clients, ...clients];

  return (
    <div className="relative mt-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20"
      />
      <motion.ul
        aria-label="Selected clients"
        className="flex w-max gap-2.5 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {items.map((client, index) => (
          <li
            key={`${client.name}-${client.location}-${index}`}
            aria-label={client.name}
            aria-hidden={index >= clients.length ? true : undefined}
            className={`group flex h-20 w-[150px] shrink-0 items-center justify-center rounded-2xl bg-white px-4 shadow-sm ring-1 ring-brand-ink/10 ${
              index >= clients.length ? "motion-reduce:hidden" : ""
            }`}
          >
            <ClientMark client={client} compact />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export function ClientLogoWall() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client, index) => (
          <Reveal
            key={`${client.name}-${client.location}`}
            delay={(index % 3) * 0.06}
            className="h-full"
          >
            <article className="group flex h-full flex-col rounded-3xl bg-white p-4 shadow-xl shadow-black/10 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 sm:p-5">
              <div className="flex h-24 items-center justify-center rounded-2xl bg-brand-cream px-4">
                <ClientMark client={client} color />
              </div>
              <div className="mt-4 flex flex-1 items-end justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold leading-snug text-brand-ink">
                    {client.name}
                  </h3>
                  <p className="mt-2 inline-flex rounded-full bg-brand-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ink/50">
                    {client.location}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mb-1 h-2 w-2 shrink-0 rounded-full bg-brand-red/70"
                />
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.06} className="h-full">
          <Link
            href="/contact"
            className="group flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-red to-brand-red-dark p-6 text-white shadow-xl shadow-black/20 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                Your workplace next
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold leading-tight">
                Let&rsquo;s put your team on this list.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Tell us your headcount and site, and we&rsquo;ll plan the menu.
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
      <p className="mt-6 text-[11px] leading-relaxed text-white/40">
        Client names and logos are shown for identification. All trademarks remain the property of
        their respective owners.
      </p>
    </div>
  );
}
