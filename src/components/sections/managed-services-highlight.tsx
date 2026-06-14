"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
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

  return (
    <Link
      href={`/services#${service.id}`}
      className={cn(
        "interactive group block rounded-2xl focus-visible:rounded-2xl",
        featured && "lg:col-span-2",
      )}
    >
      <GlowCard variant={featured ? "elevated" : "border"} glow={false} className="h-full">
        <div className={cn("flex gap-4", featured && "sm:items-center")}>
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
              featured ? "h-14 w-14" : "h-11 w-11",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <span className="eyebrow">{service.abbr}</span>
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
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              جزئیات بیشتر
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </span>
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
