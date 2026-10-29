import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

/* Required so the manifest is emitted as a static file when using `output: "export"`. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZOORO Hospitality",
    short_name: "ZOORO",
    description:
      "Corporate canteens, industrial catering, cafeterias, events, food courts, weddings, bulk catering and healthy meal plans.",
    start_url: "/",
    display: "standalone",
    background_color: brand.cream,
    theme_color: brand.red,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
