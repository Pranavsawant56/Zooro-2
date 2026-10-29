"use client";

import { useEffect } from "react";

/**
 * Registers the service worker that powers the offline fallback page.
 * Production only — a service worker in dev caches un-hashed assets and
 * causes stale-code headaches.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      /* A worker installed by an earlier production run keeps serving cached
         dev chunks (cache-first for `/_next/`), which shows stale code — e.g.
         an old enquiry endpoint. Remove it so `next dev` always runs fresh. */
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      if (typeof caches !== "undefined") {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
      return;
    }

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration is best-effort; ignore failures.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
