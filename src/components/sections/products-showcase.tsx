import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductsShowcaseSection() {
  const [featured, secondary] = products;

  return (
    <section className="surface-card surface-muted section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            badge="محصولات"
            title={
              <>
                فناوری‌های اختصاصی <TitleAccent>RavinSec</TitleAccent>
              </>
            }
            description="از دسترسی امن VDI تا خودکارسازی تست نفوذ با Machine Learning و LLM — محصولاتی که در کنار خدمات ما قابل استقرار هستند."
          />
          <Button asChild variant="outline" className="shrink-0 border-border/80 bg-card/30">
            <Link href="/products" className="gap-2">
              مشاهده همه محصولات
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 md:grid-rows-2">
          {[featured, secondary].map((product, index) => {
            const Icon = product.icon;
            const isFeatured = index === 0;

            return (
              <Link
                key={product.id}
                href={`/products#${product.id}`}
                className={cn(
                  "interactive block rounded-xl focus-visible:rounded-xl",
                  isFeatured && "md:row-span-2",
                )}
              >
                <GlowCard
                  variant={isFeatured ? "elevated" : "border"}
                  glow={false}
                  className={cn("h-full", isFeatured && "flex flex-col justify-between")}
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3
                      className={cn(
                        "mt-5 font-display font-semibold",
                        isFeatured ? "text-2xl" : "text-lg",
                      )}
                    >
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                    {isFeatured ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-border/80 bg-secondary/50 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    جزئیات بیشتر
                    <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </span>
                </GlowCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
