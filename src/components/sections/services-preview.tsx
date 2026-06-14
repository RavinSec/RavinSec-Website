import Link from "next/link";
import {
  ArrowUpRight,
  Cloud,
  Crosshair,
  FileSearch,
  Swords,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeader } from "@/components/sections/section-header";

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
  span?: string;
}[] = [
  {
    title: "تست نفوذ",
    description:
      "وب، API، شبکه و ابر — مسیرهای قابل‌بهره‌برداری با شواهد، تأثیر و راهنمای رفع.",
    icon: Crosshair,
    span: "md:col-span-2",
  },
  {
    title: "تیم قرمز",
    description: "شبیه‌سازی مهاجم برای آزمایش کشف و پاسخ تحت فشار.",
    icon: Swords,
  },
  {
    title: "ارزیابی‌ها",
    description: "بازبینی معماری و کنترل‌ها متناسب با ریسک و اهداف انطباق شما.",
    icon: FileSearch,
  },
  {
    title: "امنیت ابری",
    description: "جستجوی پیکربندی نادرست و بازبینی هویت در AWS، Azure و GCP.",
    icon: Cloud,
    span: "md:col-span-2",
  },
];

export function ServicesPreviewSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          badge="توانمندی‌ها"
          title="امنیت ساخته‌شده برای اپراتورها"
          description="هر پروژه با دامنه روشن، شواهد قابل تکرار و راهنمای رفعی که تیم‌های شما بتوانند اجرا کنند، تحویل می‌شود."
        />
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/services" className="gap-2">
            همه خدمات
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <GlowCard key={service.title} className={service.span}>
              <div className="flex h-full flex-col">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </section>
  );
}
