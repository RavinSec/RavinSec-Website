import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { GlowCard } from "@/components/ui/glow-card";
import { siteContact } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "تماس",
  description: "برای ارزیابی امنیتی و مشاوره با RavinSec تماس بگیرید.",
};

function ContactInfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <GlowCard variant="border" glow={false}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h2 className="mt-4 font-display text-lg font-semibold">{title}</h2>
      {children}
    </GlowCard>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="تماس"
        title="بیایید پروژه بعدی شما را تعریف کنیم"
        description="محیط و اهداف خود را برای ما بنویسید. معمولاً ظرف یک روز کاری پاسخ می‌دهیم."
      />

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <ContactInfoCard icon={Mail} title="ایمیل">
              <a
                href={`mailto:${siteContact.email}`}
                className="interactive mt-1 inline-block rounded-sm text-sm text-muted-foreground hover:text-primary"
              >
                {siteContact.email}
              </a>
            </ContactInfoCard>
            <ContactInfoCard icon={Phone} title="تلفن">
              <a
                href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
                className="interactive mt-1 inline-block rounded-sm text-sm text-muted-foreground hover:text-primary"
              >
                {siteContact.phone}
              </a>
            </ContactInfoCard>
            <ContactInfoCard icon={MessageSquare} title="چه چیزی بنویسید">
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                محیط هدف، زمان‌بندی، الزامات انطباق و سابقه ارزیابی‌های قبلی به ما کمک می‌کند
                پیشنهادی متناسب ارائه دهیم.
              </p>
            </ContactInfoCard>
          </div>

          <GlowCard variant="elevated" glow={false} className="p-6 sm:p-8">
            <ContactForm />
          </GlowCard>
        </div>
      </div>
    </>
  );
}
