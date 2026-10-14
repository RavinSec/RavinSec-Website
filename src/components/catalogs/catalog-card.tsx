"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { NetworkMountain } from "@/components/catalogs/network-mountain";
import { Stagger, StaggerItem, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import type { Catalog } from "@/lib/catalogs";

type CatalogCardProps = {
  catalog: Catalog;
  index: number;
};

export function CatalogCard({ catalog, index }: CatalogCardProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative h-full"
    >
      <Link
        href={`/catalogs/${catalog.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft outline-none transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`مشاهده کاتالوگ ${catalog.persianName}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#06152b] text-slate-100">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(34,211,238,0.18),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[70%] transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
            <NetworkMountain delay={0.3 + index * 0.15} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06152b] to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[0.65rem] font-medium text-cyan-200 backdrop-blur">
              <BookOpen className="h-3 w-3" aria-hidden />
              کاتالوگ محصول
            </span>
            <span className="text-[0.65rem] text-slate-400">
              نسخه <span className="font-mono">{catalog.version}</span>
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-center">
            <p
              dir="ltr"
              className="bg-gradient-to-b from-white to-cyan-200/80 bg-clip-text font-[family-name:var(--font-geist-sans)] text-4xl font-bold tracking-[-0.04em] text-transparent sm:text-5xl"
            >
              {catalog.name}
            </p>
            <p className="mt-2 text-sm text-slate-300">{catalog.tagline}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h2 className="font-display text-xl font-semibold">
            {catalog.persianName}
            <span className="text-muted-foreground"> — {catalog.motto.join("، ")}</span>
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{catalog.summary}</p>

          <Stagger className="mt-4 flex flex-wrap gap-1.5" stagger={0.05} amount={0.5}>
            {catalog.highlights.map((item) => (
              <StaggerItem key={item} y={6}>
                <span dir="ltr" className="eyebrow">
                  {item}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            مشاهده کاتالوگ
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
