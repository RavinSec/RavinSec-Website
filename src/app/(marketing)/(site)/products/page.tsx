import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "محصولات",
  description:
    "AfraSI (VDI) و تست نفوذ مبتنی بر Machine Learning و LLM — محصولات اختصاصی RavinSec.",
};

export default function ProductsPage() {
  const [featured, secondary] = products;

  return (
    <>
      <PageHero
        badge="محصولات"
        title="فناوری امنیتی ساخته‌شده برای عملیات واقعی"
        description="محصولات RavinSec دسترسی امن، خودکارسازی تست نفوذ و خطوط دفاعی چندلایه را در قالبی قابل استقرار و پشتیبانی ارائه می‌دهند."
      />

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2">
          {[featured, secondary].map((product, index) => {
            const Icon = product.icon;
            const isFeatured = index === 0;

            return (
              <GlowCard
                key={product.id}
                id={product.id}
                variant={isFeatured ? "elevated" : "border"}
                glow={false}
                className={cn("scroll-mt-28", isFeatured && "md:row-span-2")}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h2
                  className={cn(
                    "mt-5 font-display font-semibold",
                    isFeatured ? "text-2xl" : "text-xl",
                  )}
                >
                  {product.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.longDescription}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <li key={tag} className="eyebrow">
                      {tag}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 space-y-2 border-t border-border pt-6">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm text-muted-foreground before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-primary"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            );
          })}
        </div>

        <GlowCard variant="elevated" glow={false} className="mt-16 p-8 text-center">
          <h2 className="font-display text-xl font-semibold">به مشاوره یا دمو نیاز دارید؟</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            درباره استقرار AfraSI، یکپارچه‌سازی خط لوله ML/LLM یا ترکیب محصولات با خدمات RavinSec
            با ما صحبت کنید.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact" className="gap-2">
              تماس با ما
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Button>
        </GlowCard>
      </div>
    </>
  );
}
