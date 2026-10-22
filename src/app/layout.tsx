import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "@/components/Preloader";
import OfflineWatcher from "@/components/OfflineWatcher";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { brand } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zooro",
  description: "Zooro - simple, modern solutions for your business.",
  icons: {
    icon: "/website-fvcon.png",
  },
};

export const viewport: Viewport = {
  themeColor: brand.red,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-cream text-brand-ink">
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <OfflineWatcher />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
