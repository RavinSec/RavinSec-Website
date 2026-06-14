"use client";

import Image from "next/image";

import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import type { PartnerLogo } from "@/lib/cms";

type PartnerLogoItemProps = {
  partner: PartnerLogo;
};

function PartnerLogoItem({ partner }: PartnerLogoItemProps) {
  const content = partner.logoUrl ? (
    <Image
      src={partner.logoUrl}
      alt={partner.name}
      width={120}
      height={32}
      className="h-7 w-auto object-contain grayscale transition-[filter,opacity] duration-200 group-hover:grayscale-0"
    />
  ) : (
    <span className="font-mono text-sm font-semibold tracking-wide text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
      {partner.name}
    </span>
  );

  return (
    <li
      className="group flex h-8 shrink-0 items-center opacity-50 transition-opacity duration-200 hover:opacity-100"
      aria-label={partner.name}
    >
      {partner.url ? (
        <a href={partner.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

type PartnersStripSectionProps = {
  partners: PartnerLogo[];
};

export function PartnersStripSection({ partners }: PartnersStripSectionProps) {
  if (partners.length === 0) return null;

  const partnerItems = partners.map((partner) => (
    <PartnerLogoItem key={partner.id} partner={partner} />
  ));

  return (
    <section className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeader
        badge="شرکا"
        title={
          <>
            شرکای فناوری و <TitleAccent>اتحاد</TitleAccent>
          </>
        }
        description="ما پلتفرم‌های امنیتی پیشرو را در کنار خدمات مدیریت‌شده و مشاوره‌ای یکپارچه و عملیاتی می‌کنیم."
        align="center"
        className="mx-auto"
      />
      <LogoMarquee>{partnerItems}</LogoMarquee>
    </section>
  );
}
