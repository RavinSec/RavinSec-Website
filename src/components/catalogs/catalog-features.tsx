"use client";

import { motion } from "motion/react";

import { CatalogIcon } from "@/components/catalogs/catalog-icons";
import { Reveal, Stagger, StaggerItem, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import type { CatalogFeature } from "@/lib/catalogs";

type CatalogFeaturesProps = {
  features: CatalogFeature[];
};

/** Nine key capabilities, mirroring the brochure's dark 3×3 panel. */
export function CatalogFeatures({ features }: CatalogFeaturesProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <section
      id="features"
      className="relative scroll-mt-32 overflow-hidden bg-[#06152b] text-slate-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(34,211,238,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute -start-32 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-200">
            ۰۳ · ویژگی‌های کلیدی
          </span>
          <h2 className="heading-display mt-6 text-3xl text-white sm:text-4xl">
            هر آنچه برای کنترل فایل در سازمان لازم است
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            از مدیریت کاربران تا مرورگر ایزوله — نُه قابلیت اصلی افراسی در یک نگاه.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
          amount={0.15}
        >
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} className="bg-[#06152b]">
              <motion.div
                whileHover={reduced ? undefined : { y: -3 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="group relative h-full bg-white/[0.02] p-6 transition-colors duration-200 hover:bg-white/[0.05] sm:p-7"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-300 group-hover:via-cyan-400/60" />

                <div className="flex items-center justify-between">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <CatalogIcon name={feature.icon} className="h-5 w-5" />
                    <span className="pointer-events-none absolute inset-0 rounded-xl bg-cyan-400/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <span className="font-mono text-[0.65rem] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-slate-50">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
