"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import { managedServices } from "@/lib/managed-services";
import { cn } from "@/lib/utils";

function ServiceCard({
  service,
  featured = false,
}: {
  service: (typeof managedServices)[number];
  featured?: boolean;
}) {
  const Icon = service.icon;

  const safeHref = `/services#${encodeURIComponent(service.id)}`;

  return (
    <Link
      href={safeHref}
      aria-label={`View details for ${service.title}`}
      className={cn(
        "group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        featured && "lg:col-span-2"
      )}
    >
      <GlowCard
        variant={featured ? "elevated" : "border"}
        glow={false}
        className={cn(
          "h-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/10"
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col gap-5 p-6",
            featured && "sm:flex-row sm:items-center"
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/15 text-cyan-200 transition-colors group-hover:bg-cyan-500/20",
              featured ? "h-14 w-14" : "h-11 w-11"
            )}
          >
            {Icon ? <Icon className="h-5 w-5" /> : service.abbr}
          </div>

          <div className="flex flex-1 flex-col">
            <h3
              className={cn(
                "font-display font-semibold tracking-tight text-slate-100",
                featured ? "text-2xl" : "text-xl"
              )}
            >
              {service.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
              {service.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-300 opacity-90 transition-opacity group-hover:opacity-100">
              <span>جزئیات بیشتر</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}

export function ManagedServicesHighlightSection() {
  const [featured, ...rest] = managedServices;

  return (
    <section className="relative bg-slate-900 text-slate-100 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          badge="خدمات مدیریت‌شده"
          title={<>عملیات امنیتی، مدیریت‌شده برای شما</>}
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
      </div>
    </section>
  );
}