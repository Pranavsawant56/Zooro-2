"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Spinner from "@/components/Spinner";

const ease = [0.22, 1, 0.36, 1] as const;

/** Safety net in case the browser's load event never fires. */
const MAX_VISIBLE_MS = 8000;

export default function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  // Visitors who prefer reduced motion never see the loader (hidden via CSS).
  const visible = !done;

  useEffect(() => {
    // Hide once the browser has actually finished loading the page and its
    // resources (images, fonts, etc.). This is real readiness — not a timer.
    const finish = () => setDone(true);

    if (document.readyState === "complete") {
      const tick = window.setTimeout(finish, 0);
      return () => window.clearTimeout(tick);
    }

    window.addEventListener("load", finish, { once: true });
    const safety = window.setTimeout(finish, MAX_VISIBLE_MS);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(safety);
    };
  }, []);

  // Lock scrolling while the loader covers the page.
  useEffect(() => {
    if (!visible || reduce) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible, reduce]);

  return (
    <>
      <noscript>
        <style>{`#zooro-preloader{display:none !important}`}</style>
      </noscript>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="preloader"
            id="zooro-preloader"
            role="status"
            aria-live="polite"
            aria-label="Loading ZOORO Hospitality"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-brand-cream motion-reduce:hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
          >
            {/* soft brand blobs, matching the hero */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-gold/30 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-red/15 blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center gap-6">
              {/* spinning ring around the Z badge */}
              <div className="relative flex h-28 w-28 items-center justify-center">
                <Spinner
                  className="absolute inset-0 h-28 w-28 border-4"
                  label="Loading ZOORO Hospitality"
                />
                <motion.span
                  className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-brand-red bg-white font-display text-3xl font-extrabold text-brand-red"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  Z
                </motion.span>
              </div>

              {/* wordmark */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
              >
                <p className="font-display text-3xl font-extrabold tracking-tight text-brand-red">
                  ZOORO
                </p>
                <p className="mt-1 text-[11px] font-bold tracking-[0.3em] text-brand-ink/70">
                  HOSPITALITY
                </p>
              </motion.div>

              {/* indeterminate progress bar (no fake duration) */}
              <div className="h-1 w-48 overflow-hidden rounded-full bg-brand-ink/10">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand-gold via-brand-red to-brand-leaf"
                  animate={{ x: ["-110%", "310%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
