"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OfflineScreen from "@/components/OfflineScreen";

const ease = [0.22, 1, 0.36, 1] as const;

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

const getSnapshot = () => !navigator.onLine;
// Assume online during SSR / hydration, then sync on the client.
const getServerSnapshot = () => false;

/**
 * Shows a full-screen offline message the moment the connection drops while the
 * visitor is on the site, and removes it as soon as they're back online.
 */
export default function OfflineWatcher() {
  const offline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <AnimatePresence>
      {offline && (
        <motion.div
          key="offline-overlay"
          role="alertdialog"
          aria-label="You are offline"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-brand-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
        >
          <OfflineScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
