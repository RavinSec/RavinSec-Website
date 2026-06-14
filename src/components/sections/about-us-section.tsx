"use client";

import { motion } from "framer-motion";
import { Award, Building2, Clock } from "lucide-react";

import { GlowCard } from "@/components/ui/glow-card";
import {
  scaleInViewProps,
  slideInViewProps,
  useReducedMotionPreferred,
} from "@/lib/motion";

import { SectionHeader, TitleAccent } from "./section-header";

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

export function AboutUsSection() {
  const reducedMotion = useReducedMotionPreferred();

  return (
    <section id="about" className="surface-muted section-padding overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...slideInViewProps(reducedMotion)}>
            <SectionHeader
              title={
                <>
                  درباره <TitleAccent>RavinSec</TitleAccent>
                </>
              }
              description="RavinSec توسط متخصصان برجسته امنیت تهاجمی و دفاعی تأسیس شد تا فاصله میان انطباق و امنیت واقعی را پر کند. ما با سازمان‌ها همکاری می‌کنیم تا معماری‌های مقاوم بسازند و آن‌ها را در برابر مهاجمان واقعی آزمایش کنیم."
              align="left"
            />
            <div className="mt-8 space-y-4">
              {values.map((value) => (
                <GlowCard key={value.title} variant="border" glow={false} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </motion.div>

          <motion.div {...scaleInViewProps(reducedMotion)}>
            <GlowCard variant="elevated" glow={false} className="p-8">
              <h3 className="font-display text-2xl font-semibold">در یک نگاه</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                بیش از یک دهه تجربه ترکیبی در حفاظت از زیرساخت‌های حیاتی و شرکت‌های فناوری
                پررشد.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex min-h-[5.5rem] flex-col items-center justify-center rounded-xl border border-border bg-white px-2 py-4 text-center shadow-soft sm:min-h-[6rem] sm:px-3"
                  >
                    <dt className="text-[0.65rem] leading-snug text-muted-foreground sm:text-xs">
                      {metric.label}
                    </dt>
                    <dd
                      className={
                        metric.compact
                          ? "mt-2 font-mono text-[0.65rem] font-semibold leading-none text-primary sm:text-xs"
                          : "stat-value mt-2 leading-none text-primary"
                      }
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
