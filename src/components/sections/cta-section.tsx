import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-[hsl(217,91%,40%)] to-[hsl(214,95%,35%)] px-8 py-12 shadow-elevated sm:px-12 sm:py-16">
          <div className="bg-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 start-1/3 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                آماده آزمایش دفاع‌های خود هستید؟
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                دامنه و زمان‌بندی خود را به اشتراک بگذارید — ما پروژه‌ای متناسب با تیم و
                پروفایل ریسک شما پیشنهاد می‌دهیم.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group shrink-0 gap-2 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/contact">
                شروع گفتگو
                <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
