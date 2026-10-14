"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, CheckCircle2 } from "lucide-react";

import { ProductVisual } from "@/components/products/product-visuals";
import { Button } from "@/components/ui/button";
import { fadeUpInViewProps, useReducedMotionPreferred } from "@/lib/motion";
import { products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Quick-jump strip under the page hero. */
export function ProductsJumpBar() {
  const reduced = useReducedMotionPreferred();

  return (
    <motion.nav
      {...fadeUpInViewProps(reduced, { y: 10 })}
      aria-label="فهرست محصولات"
      className="grid gap-3 sm:grid-cols-2"
    >
      {products.map((product, index) => {
        const Icon = product.icon;
        return (
          <Link
            key={product.id}
            href={`#${product.id}`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                {String(index + 1).padStart(2, "0")} · {product.label}
              </span>
              <span className="block truncate font-display text-base font-semibold">{product.name}</span>
            </span>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              aria-hidden
            />
          </Link>
        );
      })}
    </motion.nav>
  );
}

export function ProductDetailSections() {
  return (
    <div className="divide-y divide-border">
      {products.map((product, index) => (
        <ProductDetail key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

function ProductDetail({ product, index }: { product: Product; index: number }) {
  const reduced = useReducedMotionPreferred();
  const Icon = product.icon;
  const flip = index % 2 === 1;

  return (
    <section id={product.id} className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Copy */}
        <motion.div
          {...fadeUpInViewProps(reduced, { y: 20 })}
          className={cn("lg:col-span-6", flip && "lg:order-2")}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">{product.label}</span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {product.status}
            </span>
            <span className="text-xs text-muted-foreground">{product.category}</span>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow-primary sm:flex">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="heading-display text-3xl leading-tight sm:text-4xl">{product.name}</h2>
          </div>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.longDescription}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/contact" className="gap-2">
                درخواست دمو
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Button>
            {product.catalogSlug ? (
              <Button asChild variant="outline">
                <Link href={`/catalogs/${product.catalogSlug}`} className="gap-2">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  کاتالوگ تعاملی
                </Link>
              </Button>
            ) : null}
          </div>
        </motion.div>

        {/* Visual + specs */}
        <motion.div
          {...fadeUpInViewProps(reduced, { delay: 0.12, y: 24 })}
          className={cn("lg:col-span-6", flip && "lg:order-1")}
        >
          <div className="rounded-3xl border border-border bg-gradient-to-b from-slate-50 to-white p-2 shadow-soft">
            <ProductVisual visual={product.visual} />
          </div>

          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="bg-white p-4">
                <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                  {spec.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <li key={tag} className="eyebrow">
                {tag}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
