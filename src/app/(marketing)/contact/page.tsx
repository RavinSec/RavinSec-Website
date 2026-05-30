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
            <GlowCard variant="border" glow={false}>
              <Mail className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="mt-3 font-display text-lg font-semibold">ایمیل</h2>
              <a
                href={`mailto:${siteContact.email}`}
                className="interactive mt-1 inline-block rounded-sm text-sm text-muted-foreground hover:text-primary"
              >
                {siteContact.email}
              </a>
            </GlowCard>
            <GlowCard variant="border" glow={false}>
              <Phone className="h-5 w-5 text-accent" aria-hidden />
              <h2 className="mt-3 font-display text-lg font-semibold">تلفن</h2>
              <a
                href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
                className="interactive mt-1 inline-block rounded-sm text-sm text-muted-foreground hover:text-primary"
              >
                {siteContact.phone}
              </a>
            </GlowCard>
            <GlowCard variant="border" glow={false}>
              <MessageSquare className="h-5 w-5 text-accent" aria-hidden />
              <h2 className="mt-3 font-display text-lg font-semibold">چه چیزی بنویسید</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                محیط هدف، زمان‌بندی، الزامات انطباق و سابقه ارزیابی‌های قبلی به ما کمک می‌کند
                پیشنهادی متناسب ارائه دهیم.
              </p>
            </GlowCard>
          </div>

          <GlowCard variant="elevated" glow={false} className="p-6 sm:p-8">
            <ContactForm />
          </GlowCard>
        </div>
      </div>
    </>
  );
}
