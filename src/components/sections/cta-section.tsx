import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative bg-slate-900 py-24 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-lg backdrop-blur-xl md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
                آماده آزمایش دفاع‌های خود هستید؟
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                دامنه و زمان‌بندی خود را به اشتراک بگذارید — ما پروژه‌ای متناسب با تیم و
                پروفایل ریسک شما پیشنهاد می‌دهیم.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="group shrink-0 gap-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
            >
              <Link href="/contact" aria-label="Start security assessment conversation">
                شروع گفتگو
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}