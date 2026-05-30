"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import type { Testimonial } from "@/lib/cms";
import { fadeUpInViewProps, useReducedMotionPreferred } from "@/lib/motion";
import { cn } from "@/lib/utils";

function IndustryTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-border/80 bg-secondary/50 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
  );
}

type TestimoniesSectionProps = {
  testimonies: Testimonial[];
};

export function TestimoniesSection({ testimonies }: TestimoniesSectionProps) {
  const reducedMotion = useReducedMotionPreferred();

  if (testimonies.length === 0) return null;

  const featured = testimonies.find((t) => t.featured) ?? testimonies[0];
  const secondary = testimonies.filter((t) => t.id !== featured.id);

  return (
    <section id="testimonies" className="surface-muted section-padding overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          title={
            <>
              مشتریان ما چه <TitleAccent>می‌گویند</TitleAccent>
            </>
          }
          description="فقط حرف ما را قبول نکنید. این نظر رهبران امنیتی درباره RavinSec است."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <motion.div
            {...fadeUpInViewProps(reducedMotion, { duration: 0.5 })}
            className="lg:col-span-2"
          >
            <GlowCard variant="elevated" glow={false} className="flex h-full flex-col justify-between p-8">
              <div className="flex items-start justify-between gap-4">
                <Quote className="h-8 w-8 shrink-0 text-primary/40" aria-hidden />
                {featured.industry ? <IndustryTag label={featured.industry} /> : null}
              </div>
              <blockquote className="my-6 text-xl leading-relaxed text-foreground">
                «{featured.quote}»
              </blockquote>
              <div>
                <div className="font-semibold text-foreground">{featured.author}</div>
                <div className="text-sm text-primary">{featured.role}</div>
              </div>
            </GlowCard>
          </motion.div>

          <div className="flex flex-col gap-6">
            {secondary.map((testimony, i) => (
              <motion.div
                key={testimony.id}
                {...fadeUpInViewProps(reducedMotion, { delay: (i + 1) * 0.1, duration: 0.5 })}
              >
                <GlowCard
                  variant="border"
                  glow={false}
                  className={cn("flex h-full flex-col justify-between p-6 transition-colors duration-200")}
                >
                  {testimony.industry ? (
                    <IndustryTag label={testimony.industry} />
                  ) : null}
                  <blockquote className="mb-4 mt-3 text-sm leading-relaxed text-muted-foreground">
                    «{testimony.quote}»
                  </blockquote>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{testimony.author}</div>
                    <div className="text-xs text-primary">{testimony.role}</div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
