"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-t-4 border-b-brand-ink/10 border-t-brand-red bg-white backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-brand-ink/10" : "shadow-sm shadow-brand-ink/5"
        }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="group flex items-center gap-3" aria-label="ZOORO Hospitality home">
          <Image
            src="/web-logo-4.png"
            alt="ZOORO Hospitality Private Limited"
            width={2170}
            height={725}
            sizes="192px"
            loading="eager"
            className="h-16 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 text-sm font-semibold md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative z-10 block rounded-full px-4 py-2 transition-colors ${isActive ? "text-white" : "text-brand-ink/75 hover:text-brand-red"
                    }`}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-red"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
          <li className="ml-2">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/contact"
                className="block rounded-full bg-brand-gold px-5 py-2 font-bold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
              >
                Get a quote
              </Link>
            </motion.div>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-brand-ink/15 md:hidden"
        >
          <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-brand-ink" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-5 bg-brand-ink" />
          <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-brand-ink" />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-brand-ink/10 bg-white md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-base font-semibold ${isActive ? "bg-brand-red text-white" : "text-brand-ink hover:bg-brand-cream"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-full bg-brand-gold px-5 py-3 text-center font-bold text-brand-ink">
                  Get a quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}