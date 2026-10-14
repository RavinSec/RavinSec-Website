"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, FileDown, Mail, Phone } from "lucide-react";

import { Reveal, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { Button } from "@/components/ui/button";
import type { Catalog } from "@/lib/catalogs";
import { siteContact } from "@/lib/navigation";

type CatalogCtaProps = {
  catalog: Pick<Catalog, "name" | "persianName" | "brochure">;
};

export function CatalogCta({ catalog }: CatalogCtaProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#06152b] py-20 text-slate-100 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_0%,rgba(34,211,238,0.16),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <Reveal>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-300">
              {catalog.name} · Demo & Deployment
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {catalog.persianName} را در محیط خودتان ببینید
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              برای دمو، استقرار آزمایشی کیوسک یا فعال‌سازی مرورگر ایزوله با ما در تماس باشید. تیم فنی
              راوین‌سک در انتخاب سیاست‌ها، موتورهای اسکن و معماری استقرار کنار شماست.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-cyan-400 px-7 text-slate-950 shadow-lg shadow-cyan-500/25 hover:bg-cyan-300"
              >
                <Link href="/contact" className="gap-2">
                  درخواست دمو
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </Button>
              {catalog.brochure ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-slate-600/70 bg-white/5 text-slate-200 backdrop-blur hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-200"
                >
                  <a href={catalog.brochure.url} target="_blank" rel="noopener" className="gap-2">
                    <FileDown className="h-4 w-4" />
                    نسخه چاپی بروشور
                  </a>
                </Button>
              ) : null}
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="interactive inline-flex items-center gap-2 rounded-sm hover:text-cyan-200"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  <span dir="ltr">{siteContact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
                  className="interactive inline-flex items-center gap-2 rounded-sm hover:text-cyan-200"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  <span dir="ltr">{siteContact.phone}</span>
                </a>
              </li>
            </ul>
          </Reveal>

          {catalog.brochure ? (
            <Reveal delay={0.1} className="relative">
              <motion.a
                href={catalog.brochure.url}
                target="_blank"
                rel="noopener"
                aria-label={`باز کردن نسخه چاپی بروشور ${catalog.persianName}`}
                className="group block"
                whileHover={reduced ? undefined : { y: -6, rotate: -0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 lg:opacity-60" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl ring-1 ring-cyan-400/10">
                  <Image
                    src={catalog.brochure.previewUrl}
                    alt={`پیش‌نمایش بروشور چاپی ${catalog.persianName}`}
                    width={catalog.brochure.width}
                    height={catalog.brochure.height}
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="h-auto w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/90 to-transparent px-4 pb-3 pt-10 text-xs text-slate-300">
                    <span>بروشور سه‌لت چاپی</span>
                    <span className="inline-flex items-center gap-1 text-cyan-300">
                      مشاهده
                      <ArrowUpRight className="h-3 w-3 rtl:-scale-x-100" />
                    </span>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
