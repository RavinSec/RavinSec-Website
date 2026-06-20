"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/sections/section-header";
import { fadeUpInViewProps, useReducedMotionPreferred } from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "۰۱",
    title: "دامنه و هم‌راستایی",
    description:
      "اهداف، دارایی‌ها و قوانین درگیری با ذینفعان شما تعریف می‌شود.",
  },
  {
    step: "۰۲",
    title: "آزمون و اعتبارسنجی",
    description:
      "آزمون عملی با زنجیره‌های مستند — نه اسکن‌های تیک‌زنی.",
  },
  {
    step: "۰۳",
    title: "گزارش و اولویت‌بندی",
    description:
      "یافته‌ها بر اساس قابلیت بهره‌برداری و تأثیر کسب‌وکار رتبه‌بندی می‌شوند.",
  },
  {
    step: "۰۴",
    title: "پشتیبانی رفع",
    description:
      "بازآزمون و مشاوره تا رفع‌ها انجام و پایدار بمانند.",
  },
];

export function ProcessSection() {
  const reducedMotion = useReducedMotionPreferred();

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <SectionHeader
        badge="نحوه کار ما"
        title={<>مدل تحویلی که تیم‌ها به آن اعتماد دارند</>}
        description="فازهای شفاف، ارتباط یکنواخت و خروجی‌هایی که برای مخاطبان فنی و مدیریتی طراحی شده‌اند."
        align="center"
        className="mx-auto"
      />

      <div className="relative mt-16">
        <div
          className="absolute end-[12.5%] top-5 hidden h-px w-[75%] bg-gradient-to-l from-transparent via-primary/25 to-transparent md:block"
          aria-hidden="true"
        />

        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((item, index) => (
            <motion.li
              key={item.step}
              {...fadeUpInViewProps(reducedMotion, {
                delay: index * 0.08,
                duration: 0.5,
                y: 18,
              })}
              className="relative list-none"
            >
              <div className="flex md:flex-col md:items-center md:text-center">
                <div
                  className={cn(
                    "relative z-10 flex h-11 w-11 items-center justify-center rounded-full",
                    "border border-primary/20 bg-background text-sm font-semibold text-primary",
                    "shadow-sm transition-colors duration-300 hover:border-primary/40",
                    "md:mx-auto"
                  )}
                >
                  {item.step}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="ms-4 h-full w-px self-stretch bg-primary/10 md:hidden"
                    aria-hidden="true"
                  />
                )}

                <div className="ms-4 min-w-0 md:ms-0 md:mt-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}