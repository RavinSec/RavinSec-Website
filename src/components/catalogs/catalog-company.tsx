"use client";

import { Compass, Flag, ListChecks, Target } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/catalogs/reveal";
import { Badge } from "@/components/ui/badge";
import type { CatalogCompany as CatalogCompanyData } from "@/lib/catalogs";

type CatalogCompanyProps = {
  company: CatalogCompanyData;
};

export function CatalogCompany({ company }: CatalogCompanyProps) {
  return (
    <section id="company" className="scroll-mt-32 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal>
            <Badge variant="glow" className="mb-5">
              ۰۵ · درباره راوین‌سک
            </Badge>
            <h2 className="heading-display text-3xl sm:text-4xl">
              Ravin<span className="text-primary">Sec</span>؛ سازنده‌ی افراسی
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{company.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex items-center gap-2 text-primary">
                  <Target className="h-4 w-4" aria-hidden />
                  <h3 className="font-display text-base font-semibold text-foreground">مأموریت</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{company.mission}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <div className="flex items-center gap-2 text-primary">
                  <Compass className="h-4 w-4" aria-hidden />
                  <h3 className="font-display text-base font-semibold text-foreground">چشم‌انداز</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{company.vision}</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="flex items-center gap-2 text-primary">
                  <ListChecks className="h-4 w-4" aria-hidden />
                  <h3 className="font-display text-base font-semibold text-foreground">اولویت‌ها</h3>
                </div>
                <Stagger className="mt-4 space-y-2.5" stagger={0.08}>
                  {company.priorities.map((priority) => (
                    <StaggerItem key={priority} y={8}>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                        {priority}
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="flex items-center gap-2 text-primary">
                  <Flag className="h-4 w-4" aria-hidden />
                  <h3 className="font-display text-base font-semibold text-foreground">خلاصه سبد محصولات</h3>
                </div>
                <Stagger className="mt-4 divide-y divide-border" stagger={0.08}>
                  {company.portfolio.map((product, index) => (
                    <StaggerItem key={product.label} y={8}>
                      <div className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {product.name}
                        </span>
                        <span dir="ltr" className="font-mono text-xs text-primary">
                          {product.label}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
