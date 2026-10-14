"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { SectionHeader } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import type { Testimonial } from "@/lib/cms";
import { fadeUpInViewProps, useReducedMotionPreferred } from "@/lib/motion";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name.slice(0, 2);
}

function AuthorAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-sm font-semibold text-cyan-300">
      {getInitials(name)}
    </div>
  );
}

function IndustryTag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
      {label}
    </span>
  );
}

type TestimoniesSectionProps = {
  testimonies: Testimonial[];
};

export function TestimoniesSection({ testimonies }: TestimoniesSectionProps) {
  const reducedMotion = useReducedMotionPreferred();

  if (!testimonies?.length) return null;

  const featured =
    testimonies.find((t) => t.featured) ?? testimonies[0];

  const secondary = testimonies.filter((t) => t.id !== featured.id);

  return (
    <section id="testimonies" className="relative bg-slate-900 py-24 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          badge="بازخورد مشتریان"
          title={<>مشتریان ما چه می‌گویند</>}
          description="فقط حرف ما را قبول نکنید. این نظر رهبران امنیتی درباره RavinSec است."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <motion.div
            {...fadeUpInViewProps(reducedMotion, { duration: 0.55 })}
            className="lg:col-span-2"
          >
            <GlowCard
              variant="elevated"
              glow={false}
              className="flex h-full flex-col justify-between border border-slate-700/60 bg-slate-900/60 p-8 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <Quote className="h-10 w-10 shrink-0 text-cyan-500/20" />
                {featured.industry && (
                  <IndustryTag label={featured.industry} />
                )}
              </div>

              <blockquote className="my-6 text-xl leading-relaxed text-slate-200">
                <span className="text-cyan-400">“</span>
                {featured.quote}
                <span className="text-cyan-400">”</span>
              </blockquote>

              <div className="flex items-center gap-3">
                <AuthorAvatar name={featured.author} />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-100">
                    {featured.author}
                  </div>
                  <div className="text-sm text-slate-400">
                    {featured.role}
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <div className="flex flex-col gap-6">
            {secondary.map((t, i) => (
              <motion.div
                key={t.id}
                {...fadeUpInViewProps(reducedMotion, {
                  delay: (i + 1) * 0.1,
                  duration: 0.5,
                })}
              >
                <GlowCard
                  variant="border"
                  glow={false}
                  className="flex h-full flex-col justify-between border border-slate-700/60 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    {t.industry ? <IndustryTag label={t.industry} /> : <span />}
                    <Quote className="h-4 w-4 text-cyan-500/15" />
                  </div>

                  <blockquote className="mt-3 mb-4 text-sm leading-relaxed text-slate-400">
                    “{t.quote}”
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <AuthorAvatar name={t.author} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-100">
                        {t.author}
                      </div>
                      <div className="text-xs text-slate-400">
                        {t.role}
                      </div>
                    </div>
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