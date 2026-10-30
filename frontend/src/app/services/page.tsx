import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate canteens, industrial catering, festival meals, events and buffets, healthy meal plans, food courts, weddings, bulk catering and delivery kitchen services from ZOORO Hospitality in Pune.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
