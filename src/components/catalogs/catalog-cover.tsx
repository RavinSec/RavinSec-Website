"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { NETWORK_MOUNTAIN_ASPECT, NetworkMountain } from "@/components/catalogs/network-mountain";
import { catalogEase, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { Button } from "@/components/ui/button";
import type { Catalog } from "@/lib/catalogs";

type CatalogCoverProps = {
  catalog: Pick<
    Catalog,
    "name" | "persianName" | "tagline" | "motto" | "highlights" | "version" | "updatedAt"
  >;
};

export function CatalogCover({ catalog }: CatalogCoverProps) {
  const reduced = useCatalogReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Text and artwork both drift down, at different rates, so they never converge.
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0.15]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.04]);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: catalogEase },
        };

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#06152b] text-slate-100"
      aria-labelledby="catalog-cover-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(34,211,238,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_90%,rgba(56,189,248,0.12),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      <motion.div
        style={{ y: artY, scale: artScale, aspectRatio: NETWORK_MOUNTAIN_ASPECT }}
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto min-h-[16rem] w-full max-w-[1400px]"
      >
        <NetworkMountain />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06152b] via-[#06152b]/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-72 pt-36 text-center sm:px-6 sm:pb-[24rem] sm:pt-40 lg:pt-44"
      >
        <motion.div
          {...enter(0)}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
          کاتالوگ محصول · RavinSec
        </motion.div>

        <h1 id="catalog-cover-title" className="mt-8">
          <motion.span
            {...enter(0.08)}
            dir="ltr"
            className="block bg-gradient-to-b from-white via-white to-cyan-200/80 bg-clip-text font-[family-name:var(--font-geist-sans)] text-6xl font-bold leading-none tracking-[-0.04em] text-transparent sm:text-7xl lg:text-8xl"
          >
            {catalog.name}
          </motion.span>
          <motion.span
            {...enter(0.16)}
            className="mt-6 block font-display text-2xl font-semibold text-slate-100 sm:text-3xl lg:text-4xl"
          >
            {catalog.tagline}
          </motion.span>
        </h1>

        <motion.p
          {...enter(0.24)}
          className="mt-5 flex items-center gap-3 text-base text-cyan-200/90 sm:text-lg"
        >
          {catalog.motto.map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              {i > 0 ? <span className="h-1 w-1 rounded-full bg-cyan-400/70" aria-hidden /> : null}
              {word}
            </span>
          ))}
        </motion.p>

        <motion.div {...enter(0.32)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-cyan-400 px-7 text-slate-950 shadow-lg shadow-cyan-500/25 hover:bg-cyan-300"
          >
            <a href="#intro" className="gap-2">
              مطالعه کاتالوگ
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-slate-600/70 bg-white/5 text-slate-200 backdrop-blur hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-200"
          >
            <Link href="/contact" className="gap-2">
              درخواست دمو
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Button>
        </motion.div>

        <motion.ul
          {...enter(0.4)}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          aria-label="برچسب‌های محصول"
        >
          {catalog.highlights.map((item) => (
            <li
              key={item}
              dir="ltr"
              className="rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-slate-300 backdrop-blur"
            >
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.dl
          {...enter(0.48)}
          className="mt-8 flex items-center gap-6 text-xs text-slate-400"
        >
          <div className="flex items-center gap-1.5">
            <dt>نسخه</dt>
            <dd className="font-mono text-slate-200">{catalog.version}</dd>
          </div>
          <span className="h-3 w-px bg-slate-700" aria-hidden />
          <div className="flex items-center gap-1.5">
            <dt>به‌روزرسانی</dt>
            <dd className="font-mono text-slate-200">{catalog.updatedAt}</dd>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  );
}
