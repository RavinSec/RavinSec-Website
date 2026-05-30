import type { Metadata } from "next";
import {
  Activity,
  Cloud,
  Crosshair,
  FileSearch,
  Radar,
  ShieldPlus,
  Swords,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import { managedServices } from "@/lib/managed-services";

export const metadata: Metadata = {
  title: "خدمات",
  description: "تست نفوذ، ارزیابی امنیتی و مشاوره از RavinSec.",
};

const projectServices: {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}[] = [
  {
    title: "تست نفوذ",
    description:
      "آزمون وب، API، شبکه و ابر با یافته‌های روشن، شواهد و راهنمای رفع.",
    icon: Crosshair,
    tags: ["OWASP", "API", "داخلی"],
  },
  {
    title: "تیم قرمز و شبیه‌سازی مهاجم",
    description:
      "تمرین‌های سناریومحور برای اعتبارسنجی کشف، پاسخ و تاب‌آوری تحت فشار واقعی.",
    icon: Swords,
    tags: ["تیم بنفش", "کشف"],
  },
  {
    title: "مشاوره برنامه امنیتی",
    description:
      "نقشه راه، طراحی کنترل‌ها و گزارش‌دهی مدیریتی هم‌راستا با ریسک کسب‌وکار.",
    icon: FileSearch,
    tags: ["استراتژی", "انطباق"],
  },
  {
    title: "امنیت ابری",
    description: "بازبینی هویت، پیکربندی و بارکاری در ارائه‌دهندگان ابری اصلی.",
    icon: Cloud,
    tags: ["AWS", "Azure", "GCP"],
  },
];

const managedIcons = {
  mss: ShieldPlus,
  mdr: Radar,
  amss: Activity,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="خدمات"
        title="پروژه‌هایی با دامنه‌ای مؤثر"
        description="هر خدمت با شواهد قابل تکرار، رفع اولویت‌بندی‌شده و ارتباطی متناسب با مخاطبان فنی و مدیریتی تحویل می‌شود."
      />

      <div className="section-padding mx-auto max-w-6xl space-y-20 px-4 sm:px-6">
        <section>
          <SectionHeader
            badge="مدیریت‌شده"
            title="خدمات امنیت مدیریت‌شده"
            description="سه سطح پوشش عملیاتی — از پایش پایه تا کشف پیشرفته و رهبری برنامه."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {managedServices.map((service) => {
              const Icon = managedIcons[service.id as keyof typeof managedIcons];
              return (
                <GlowCard
                  key={service.id}
                  id={service.id}
                  variant="border"
                  glow={false}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                      {service.abbr}
                    </span>
                    <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeader
            badge="پروژه‌ای"
            title="خدمات مشاوره‌ای و ارزیابی"
            description="پروژه‌های متمرکز با دامنه مشخص — از تست نفوذ تا تیم قرمز و مشاوره برنامه."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {projectServices.map((service) => {
              const Icon = service.icon;
              return (
                <GlowCard key={service.title} variant="border" glow={false}>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="font-display text-xl font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border/80 bg-secondary/50 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
