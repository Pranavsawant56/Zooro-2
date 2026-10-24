"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { clients, type Client } from "@/lib/site";

function ClientMark({
  client,
  compact = false,
}: {
  client: Client;
  compact?: boolean;
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
        sizes={compact ? "160px" : "220px"}
        className="object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
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
            <article className="group flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brand-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-ink/5 sm:p-6">
              <div className="flex h-24 items-center justify-center rounded-2xl bg-brand-cream/70 px-4">
                <ClientMark client={client} />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-extrabold leading-snug text-brand-ink">
                  {client.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink/45">
                  {client.location}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-[11px] leading-relaxed text-brand-ink/40">
        Client names and logos are shown for identification. All trademarks remain
        the property of their respective owners.
      </p>
    </div>
  );
}
