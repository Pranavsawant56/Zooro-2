import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { contact } from "@/lib/site";

const quick = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/about#clients", label: "Our clients" },
  { href: "/contact", label: "Contact Us" },
];

const services = [
  "Corporate canteen",
  "Industrial catering",
  "Festival & occasion meals",
  "Events & buffets",
  "Healthy meals",
  "Food court",
  "Weddings & bulk catering",
  "Delivery kitchen",
];

async function CurrentYear() {
  await connection();
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      {/* brand stripe */}
      <div className="flex h-1.5">
        <span className="flex-1 bg-brand-red" />
        <span className="flex-1 bg-brand-gold" />
        <span className="flex-1 bg-brand-leaf" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-extrabold text-brand-gold">ZOORO</p>
          <p className="text-xs font-bold tracking-wide text-white/70">HOSPITALITY PVT. LTD.</p>
          <p className="mt-4 text-sm text-white/70">
            Good food, better people, brighter workplaces. Food for a better tomorrow.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Trusted by 11 organisations across Pune
          </p>
        </div>

        <div>
          <h3 className="font-bold">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {services.map((s) => (
              <li key={s}>
                <Link href="/services" className="transition-colors hover:text-brand-gold">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Contact</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-white/70">
            <p>
              {contact.addressLines[0]}
              <br />
              {contact.addressLines[1]}
            </p>
            <p className="space-y-1">
              {contact.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="block transition-colors hover:text-brand-gold"
                >
                  {phone.display}
                </a>
              ))}
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-brand-gold">
                {contact.email}
              </a>
            </p>
            <p>
              <a
                href={contact.websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-gold"
              >
                {contact.website}
              </a>
            </p>
            <p className="text-xs text-white/45">
              {contact.director}, Director
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/50">
        © <Suspense fallback={null}><CurrentYear /></Suspense> ZOORO Hospitality Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
