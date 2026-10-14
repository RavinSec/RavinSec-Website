import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type PageHeroProps = {
  badge?: string;
  title: string;
  description: string;
  /** Optional extra content under the description (meta, filters, actions). */
  children?: ReactNode;
};

export function PageHero({ badge, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="grid-bg absolute inset-0" />
      <div className="pointer-events-none absolute -start-32 top-10 h-48 w-48 rounded-full bg-primary/8 blur-[100px]" />

      {/* Top padding clears the fixed floating header. */}
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:pt-36">
        {badge ? (
          <Badge variant="glow" className="mb-5">
            {badge}
          </Badge>
        ) : null}
        <h1 className="heading-display max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
