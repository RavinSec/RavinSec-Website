import type { Metadata } from "next";
import { Geist_Mono, Vazirmatn } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "../globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "RavinSec — خدمات امنیت سایبری",
    template: "%s | RavinSec",
  },
  description:
    "RavinSec تست نفوذ، ارزیابی امنیتی و خدمات مشاوره‌ای را برای سازمان‌های مدرن ارائه می‌دهد.",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "RavinSec",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} ${geistMono.variable} min-h-screen font-sans`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
