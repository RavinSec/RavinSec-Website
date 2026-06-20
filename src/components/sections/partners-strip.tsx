"use client";

import Image from "next/image";
import Link from "next/link";

import { LogoMarquee } from "@/components/ui/logo-marquee";
import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import type { PartnerLogo } from "@/lib/cms";

type PartnerLogoItemProps = {
  partner: PartnerLogo;
};

function PartnerLogoItem({ partner }: PartnerLogoItemProps) {
  const content = partner.logoUrl ? (
    <div className="flex h-14 items-center justify-center px-6">
      <Image
        src={partner.logoUrl}
        alt={partner.name}
        width={120}
        height={40}
        className="h-8 w-auto object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
      />
    </div>
  ) : (
    <span className="text-sm font-medium text-slate-600">
      {partner.name}
    </span>
  );

  return partner.url ? (
    <Link
      href={partner.url}
      target="_blank"
      className="flex items-center justify-center px-2 transition hover:scale-[1.03]"
    >
      {content}
    </Link>
  ) : (
    <div className="flex items-center justify-center px-2">{content}</div>
  );
}

type PartnersStripSectionProps = {
  partners: PartnerLogo[];
};

export function PartnersStripSection({
  partners,
}: PartnersStripSectionProps) {
  if (partners.length === 0) return null;

  const partnerItems = partners.map((partner, idx) => (
    <PartnerLogoItem key={partner.name + idx} partner={partner} />
  ));

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          badge="مورد اعتماد سازمان‌ها"
          title={
            <>
              اعتماد <TitleAccent>تیم‌های فناوری و امنیت</TitleAccent>
            </>
          }
          description="شرکت‌ها و سازمان‌های مختلف برای ارزیابی امنیت، تست نفوذ و ارتقای امنیت اپلیکیشن‌های خود به راوین‌سک اعتماد کرده‌اند."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 px-6 py-10 shadow-sm backdrop-blur-md">
          <LogoMarquee>{partnerItems}</LogoMarquee>
        </div>
      </div>
    </section>
  );
}