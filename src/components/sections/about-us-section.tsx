"use client";

import { motion } from "framer-motion";
import { Award, Building2, Clock } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import {
  scaleInViewProps,
  slideInViewProps,
  useReducedMotionPreferred,
} from "@/lib/motion";

import { SectionHeader } from "@/components/sections/section-header";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Award,
    title: "دفاع چندلایه",
    description:
      "ما به رویکردهای امنیتی لایه‌ای باور داریم که در برابر تهدیدات مدرن محافظت قوی فراهم می‌کنند.",
  },
  {
    icon: Building2,
    title: "هدف‌گیری دقیق",
    description:
      "عملیات تهاجمی ما دقیق است؛ نویز را به حداقل می‌رساند و یافته‌های قابل‌اجرا را به حداکثر می‌رساند.",
  },
  {
    icon: Clock,
    title: "پاسخ سریع",
    description:
      "هنگام وقوع حادثه، تیم‌های MDR ما آماده‌اند تا در لحظه تهدید را مهار کنند.",
  },
];

const metrics = [
  { label: "سال تجربه ترکیبی", value: "۱۰+", compact: false },
  { label: "صنعت تحت پوشش", value: "۸+", compact: false },
  { label: "گواهینامه‌ها", value: "OWASP · ISO", compact: true },
];

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border/60 bg-background p-5 transition-colors hover:border-primary/20">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function AboutUsSection() {
  const reducedMotion = useReducedMotionPreferred();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div {...slideInViewProps(reducedMotion)}>
          <SectionHeader
            badge="درباره ما"
            title={<>درباره RavinSec</>}
            description="RavinSec توسط متخصصان برجسته امنیت تهاجمی و دفاعی تأسیس شد تا فاصله میان انطباق و امنیت واقعی را پر کند. ما با سازمان‌ها همکاری می‌کنیم تا معماری‌های مقاوم بسازند و آن‌ها را در برابر مهاجمان واقعی آزمایش کنیم."
            align="left"
          />

          <div className="mt-10 grid gap-5">
            {values.map((value) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </motion.div>

        <motion.div {...scaleInViewProps(reducedMotion)}>
          <GlowCard variant="elevated" glow={false} className="p-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              در یک نگاه
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              بیش از یک دهه تجربه ترکیبی در حفاظت از زیرساخت‌های حیاتی و شرکت‌های فناوری
              پررشد.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={cn(
                    "flex min-h-[5.5rem] flex-col items-center justify-center rounded-xl border bg-background px-2 py-4 text-center transition-colors",
                    "border-border/60 hover:border-primary/20"
                  )}
                >
                  <dt className="text-[0.65rem] leading-snug text-muted-foreground sm:text-xs">
                    {metric.label}
                  </dt>

                  <dd
                    className={cn(
                      "mt-2 text-primary",
                      metric.compact
                        ? "font-mono text-[0.7rem] font-semibold sm:text-xs"
                        : "text-lg font-semibold"
                    )}
                  >
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}