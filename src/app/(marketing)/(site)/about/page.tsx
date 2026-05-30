import type { Metadata } from "next";
import { Target, Users, Zap } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "با RavinSec و رویکرد ما به خدمات امنیت سایبری آشنا شوید.",
};

const values = [
  {
    icon: Target,
    title: "محوریت نتیجه",
    description:
      "ما یافته‌هایی را اولویت می‌دهیم که تیم‌های شما بتوانند رفع کنند و مدیریت بتواند بودجه بدهد — نه معیارهای نمایشی.",
  },
  {
    icon: Zap,
    title: "ذهنیت اپراتوری",
    description:
      "مشاوران ما دفاع را در محیط تولید پیاده کرده‌اند، نه فقط درباره آن گزارش نوشته‌اند.",
  },
  {
    icon: Users,
    title: "مشارکت",
    description:
      "ما در کنار تیم‌های شما کار می‌کنیم، شفاف ارتباط می‌گیریم و با تغییر دامنه و ریسک سازگار می‌شویم.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="درباره ما"
        title="متخصصان امنیت، نه فروشندگان تیک‌زنی"
        description="RavinSec به سازمان‌ها کمک می‌کند ریسک واقعی را درک کنند، دفاع‌ها را اعتبارسنجی کنند و برنامه‌های امنیتی بسازند که با گذر زمان بهتر می‌شوند."
      />

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          title="آنچه برای آن ایستاده‌ایم"
          description="متن صفحه و جزئیات تیم پس از اتصال CMS قابل مدیریت خواهد بود — این اصول نحوه کار ما را امروز تعریف می‌کنند."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <GlowCard key={item.title} variant="border" glow={false}>
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <h2 className="mt-4 font-display text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
