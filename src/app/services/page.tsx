import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | ZOORO Hospitality",
  description:
    "Corporate canteens, industrial catering, festival and occasion meals, events and buffets, and healthy meal plans from ZOORO Hospitality in Pune.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
