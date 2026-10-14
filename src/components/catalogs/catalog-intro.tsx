"use client";

import { ArrowLeft } from "lucide-react";

import { CatalogIcon } from "@/components/catalogs/catalog-icons";
import { CatalogPipeline } from "@/components/catalogs/catalog-pipeline";
import { Reveal, Stagger, StaggerItem } from "@/components/catalogs/reveal";
import { Badge } from "@/components/ui/badge";
import type { Catalog } from "@/lib/catalogs";

type CatalogIntroProps = {
  catalog: Pick<Catalog, "persianName" | "intro" | "pipeline" | "components">;
};

export function CatalogIntro({ catalog }: CatalogIntroProps) {
  return (
    <section id="intro" className="relative scroll-mt-32 overflow-hidden bg-background">
      <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Badge variant="glow" className="mb-5">
              ۰۱ · معرفی
            </Badge>
            <h2 className="heading-display text-3xl sm:text-4xl">{catalog.intro.title}</h2>
          </Reveal>

          <Reveal delay={0.05} className="space-y-4 text-base leading-8 text-muted-foreground lg:pt-12">
            {catalog.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            مسیر عبور فایل
          </p>
          <CatalogPipeline steps={catalog.pipeline} />
        </Reveal>

        <div className="mt-16 lg:mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  معماری سامانه
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">سه بخش، یک خط دفاعی</h3>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                پنل وب، بک‌اند و کیوسک به‌صورت جداگانه مستقر می‌شوند و هر کدام توکن و سطح دسترسی خود را
                دارند.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {catalog.components.map((component, index) => (
              <StaggerItem key={component.id} className="relative">
                <article className="group relative h-full rounded-2xl border border-border bg-white p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-elevated motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                      <CatalogIcon name={component.icon} className="h-5 w-5" />
                    </div>
                    <span dir="ltr" className="eyebrow">
                      {component.name}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-lg font-semibold">{component.role}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {component.description}
                  </p>
                </article>

                {index < catalog.components.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -end-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-soft md:flex"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
