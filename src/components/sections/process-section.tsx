"use client";

import { motion } from "framer-motion";

import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import { fadeUpInViewProps, useReducedMotionPreferred } from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "۰۱",
    title: "دامنه و هم‌راستایی",
    description: "اهداف، دارایی‌ها و قوانین درگیری با ذینفعان شما تعریف می‌شود.",
  },
  {
    step: "۰۲",
    title: "آزمون و اعتبارسنجی",
    description: "آزمون عملی با زنجیره‌های مستند — نه اسکن‌های تیک‌زنی.",
  },
  {
    step: "۰۳",
    title: "گزارش و اولویت‌بندی",
    description: "یافته‌ها بر اساس قابلیت بهره‌برداری و تأثیر کسب‌وکار رتبه‌بندی می‌شوند.",
  },
  {
    step: "۰۴",
    title: "پشتیبانی رفع",
    description: "بازآزمون و مشاوره تا رفع‌ها انجام و پایدار بمانند.",
  },
];

export function ProcessSection() {
  const reducedMotion = useReducedMotionPreferred();

  return (
    <section className="surface-muted section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge="نحوه کار ما"
          title={
            <>
              مدل تحویلی که تیم‌ها به آن <TitleAccent>اعتماد</TitleAccent> دارند
            </>
          }
          description="فازهای شفاف، ارتباط یکنواخت و خروجی‌هایی که برای مخاطبان فنی و مدیریتی طراحی شده‌اند."
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-16">
          {/* Connecting line — desktop horizontal (RTL: right to left) */}
          <div
            className="absolute end-[12.5%] top-5 hidden h-px w-[75%] bg-gradient-to-l from-transparent via-primary/20 to-transparent md:block"
            aria-hidden
          />

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((item, index) => (
              <motion.li
                key={item.step}
                {...fadeUpInViewProps(reducedMotion, { delay: index * 0.1, duration: 0.45, y: 20 })}
                className="relative list-none"
              >
                <div className="flex md:flex-col md:items-center md:text-center">
                  <div
                    className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-white font-mono text-sm font-semibold text-primary shadow-soft",
                      "md:mx-auto",
                    )}
                  >
                    {item.step}
                  </div>
                  {index < steps.length - 1 ? (
                    <div
                      className="ms-4 h-full w-px self-stretch bg-primary/15 md:hidden"
                      aria-hidden
                    />
                  ) : null}
                  <div className="ms-4 min-w-0 md:ms-0 md:mt-5">
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
