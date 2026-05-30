import { Badge } from "@/components/ui/badge";

type PageHeroProps = {
  badge?: string;
  title: string;
  description: string;
};

export function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.1]" aria-hidden />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -start-32 top-10 h-48 w-48 rounded-full bg-primary/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        {badge ? (
          <Badge variant="glow" className="mb-4">
            {badge}
          </Badge>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
