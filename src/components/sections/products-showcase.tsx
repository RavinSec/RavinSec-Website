"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Check } from "lucide-react";

import { ProductVisual } from "@/components/products/product-visuals";
import { fadeUpInViewProps, useReducedMotionPreferred } from "@/lib/motion";
import { products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductsShowcaseSection() {
  const reduced = useReducedMotionPreferred();

  return (
    <section className="relative overflow-hidden bg-[#06152b] py-24 text-slate-100 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          {...fadeUpInViewProps(reduced)}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-cyan-200">
              محصولات
            </span>
            <h2 className="heading-display mt-5 text-3xl leading-tight text-white sm:text-4xl">
              فناوری‌های اختصاصی RavinSec
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              از کنترل امن ورود و خروج فایل تا خودکارسازی تست نفوذ با Machine Learning و LLM —
              محصولاتی که در کنار خدمات ما قابل استقرار هستند.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
          >
            مشاهده همه محصولات
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {products.map((product, index) => (
            <ShowcaseCard
              key={product.id}
              product={product}
              index={index}
              className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({
  product,
  index,
  className,
}: {
  product: Product;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotionPreferred();
  const Icon = product.icon;
  const detailHref = `/products#${encodeURIComponent(product.id)}`;

  return (
    <motion.article
      {...fadeUpInViewProps(reduced, { delay: 0.08 + index * 0.1, y: 20 })}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/30",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-400/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <ProductVisual
        visual={product.visual}
        className="aspect-[4/3] border-white/10 sm:aspect-[16/9] lg:aspect-auto lg:h-64"
      />

      <div className="relative flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[0.65rem] uppercase tracking-wider text-cyan-200/80">
              {product.label}
            </div>
            <div className="text-xs text-slate-400">{product.category}</div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-medium text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {product.status}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{product.description}</p>

        <ul className="mt-4 space-y-2">
          {product.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            {product.catalogSlug ? (
              <Link
                href={`/catalogs/${product.catalogSlug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                کاتالوگ
              </Link>
            ) : null}
            <Link
              href={detailHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              جزئیات محصول
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
