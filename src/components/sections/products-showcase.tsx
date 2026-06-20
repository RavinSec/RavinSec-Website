"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductsShowcaseSection() {
  const [featured, secondary] = products;

  return (
    <section className="relative bg-slate-900 text-slate-100 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          badge="محصولات"
          title={<>فناوری‌های اختصاصی RavinSec</>}
          description="از دسترسی امن VDI تا خودکارسازی تست نفوذ با Machine Learning و LLM — محصولاتی که در کنار خدمات ما قابل استقرار هستند."
          align="center"
          className="mx-auto"
        />

        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            مشاهده همه محصولات
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-4 py-5 w-fit justify-center mx-auto">
          {[featured, secondary].map((product, index) => {
            const Icon = product.icon;
            const isFeatured = index === 0;

            return (
              <Link
                key={product.id}
                href={`/products#${encodeURIComponent(product.id)}`}
                aria-label={`View details for ${product.name}`}
                className={cn(
                  "group block h-full rounded-2xl outline-none",
                  "focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                  isFeatured && "md:row-span-2"
                )}
              >
                <GlowCard
                  variant={isFeatured ? "elevated" : "border"}
                  glow={false}
                  className={cn(
                    "h-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/10",
                    isFeatured && "flex flex-col h-fit"
                  )}
                >
                  <div className="p-6">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 transition-colors group-hover:bg-cyan-500/15"
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>

                    <h3
                      className={cn(
                        "mt-5 font-display font-semibold tracking-tight text-slate-100",
                        isFeatured ? "text-2xl" : "text-lg"
                      )}
                    >
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {product.description}
                    </p>

                    {isFeatured && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 opacity-90 transition-opacity group-hover:opacity-100">
                      جزئیات بیشتر
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                    </span>
                  </div>
                </GlowCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}