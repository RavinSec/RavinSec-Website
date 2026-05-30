import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";

export function CtaSection() {
  return (
    <section className="surface-muted section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <GlowCard variant="elevated" glow={false} className="relative overflow-hidden rounded-2xl px-8 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 start-1/3 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                آماده آزمایش دفاع‌های خود هستید؟
              </h2>
              <p className="mt-3 text-muted-foreground">
                دامنه و زمان‌بندی خود را به اشتراک بگذارید — ما پروژه‌ای متناسب با تیم و
                پروفایل ریسک شما پیشنهاد می‌دهیم.
              </p>
            </div>
            <Button asChild size="lg" className="group shrink-0 gap-2 shadow-lg shadow-primary/25">
              <Link href="/contact">
                شروع گفتگو
                <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
