import type { Metadata } from "next";
import OfflineScreen from "@/components/OfflineScreen";

export const metadata: Metadata = {
  title: "Offline | ZOORO Hospitality",
  description: "You appear to be offline.",
};

/**
 * Standalone offline page. The service worker serves this route whenever a
 * navigation fails because the visitor has no connection.
 */
export default function OfflinePage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-brand-cream py-20">
      <OfflineScreen />
    </div>
  );
}
