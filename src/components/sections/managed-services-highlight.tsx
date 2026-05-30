import Link from "next/link";

import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import { managedServices } from "@/lib/managed-services";
import { cn } from "@/lib/utils";

const serviceStyles: Record<string, { ring: string; icon: string }> = {
  mss: { ring: "group-hover:border-accent/40", icon: "group-hover:text-accent" },
  mdr: { ring: "group-hover:border-primary/40", icon: "group-hover:text-primary" },
  amss: { ring: "group-hover:border-amber-500/40", icon: "group-hover:text-amber-400" },
};

function ServiceCard({
  service,
  featured = false,
}: {
  service: (typeof managedServices)[number];
  featured?: boolean;
}) {
  const Icon = service.icon;
  const styles = serviceStyles[service.id];

  return (
    <Link
      href={`/services#${service.id}`}
      className={cn(
        "interactive group block rounded-xl focus-visible:rounded-xl",
        featured && "lg:col-span-2",
      )}
    >
      <GlowCard
        variant={featured ? "elevated" : "border"}
        glow={false}
        className={cn("h-full transition-colors duration-200", styles.ring)}
      >
        <div className={cn("flex gap-4", featured && "sm:items-center")}>
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary",
              featured ? "h-14 w-14" : "h-11 w-11",
            )}
          >
            <Icon className={cn("h-5 w-5 transition-colors duration-200", styles.icon)} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                {service.abbr}
              </span>
            </div>
            <h3
              className={cn(
                "mt-3 font-display font-semibold",
                featured ? "text-2xl" : "text-xl",
              )}
            >
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}

export function ManagedServicesHighlightSection() {
  const [featured, ...rest] = managedServices;

  return (
    <section className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeader
        badge="خدمات مدیریت‌شده"
        title={
          <>
            عملیات امنیتی، <TitleAccent>مدیریت‌شده</TitleAccent> برای شما
          </>
        }
        description="سه سطح پوشش مدیریت‌شده — از عملیات پایه تا کشف پیشرفته و رهبری برنامه."
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <ServiceCard service={featured} featured />
        {rest.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
