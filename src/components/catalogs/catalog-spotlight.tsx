"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

import { IsolatedBrowserVisual, KioskVisual } from "@/components/catalogs/catalog-visuals";
import { Reveal, Stagger, StaggerItem, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { Badge } from "@/components/ui/badge";
import type { CatalogSpotlight as CatalogSpotlightItem, CatalogSpotlightVisual } from "@/lib/catalogs";
import { cn } from "@/lib/utils";

const visuals: Record<CatalogSpotlightVisual, React.ComponentType<{ className?: string }>> = {
  kiosk: KioskVisual,
  "isolated-browser": IsolatedBrowserVisual,
};

type CatalogSpotlightProps = {
  spotlights: CatalogSpotlightItem[];
};

/** Deep-dive on the two headline capabilities: the physical kiosk and the isolated browser. */
export function CatalogSpotlight({ spotlights }: CatalogSpotlightProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <section id="spotlight" className="scroll-mt-32 border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <Badge variant="glow" className="mb-5">
            ۰۲ · کیوسک و مرورگر ایزوله
          </Badge>
          <h2 className="heading-display text-3xl sm:text-4xl">
            دو درگاه کنترل‌شده برای <span className="text-primary">ورود فایل</span> و{" "}
            <span className="text-primary">اینترنت آزاد</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            افراسی هر دو مسیر پرریسک سازمان را پوشش می‌دهد: رسانه‌های فیزیکی از طریق کیوسک و مرور وب از
            طریق مرورگر ایزوله. در هر دو، هیچ فایلی بدون اسکن چندموتوره به کاربر نمی‌رسد.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8 lg:space-y-10">
          {spotlights.map((item, index) => {
            const Visual = visuals[item.visual];
            const reverse = index % 2 === 1;

            return (
              <motion.article
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-soft lg:grid-cols-2"
              >
                <div className={cn("relative p-6 sm:p-8 lg:p-10", reverse && "lg:order-2")}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-glow-primary">
                      {index + 1}
                    </span>
                    <span dir="ltr" className="eyebrow">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.description}
                  </p>

                  <Stagger className="mt-6 grid gap-2.5 sm:grid-cols-2" stagger={0.06} amount={0.4}>
                    {item.bullets.map((bullet) => (
                      <StaggerItem key={bullet} y={10}>
                        <div className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-muted/40 px-3 py-2.5 text-sm">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                          <span className="leading-snug text-foreground/90">{bullet}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>

                <div
                  className={cn(
                    "relative flex items-center bg-gradient-to-br from-primary/[0.06] via-transparent to-sky-400/[0.08] p-6 sm:p-8 lg:p-10",
                    reverse && "lg:order-1",
                  )}
                >
                  <Visual className="shadow-elevated" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
