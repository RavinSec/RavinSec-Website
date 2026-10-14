"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers, Radar, ThumbsUp, Timer } from "lucide-react";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import {
  fadeUpDelayedProps,
  fadeUpProps,
  motionTransition,
  useReducedMotionPreferred,
} from "@/lib/motion";

const signals = [
  { icon: Timer, label: "میانگین زمان تحویل گزارش", end: 5, suffix: " روز" },
  { icon: Layers, label: "پروژه‌های انجام‌شده", end: 200, suffix: "+" },
  { icon: ThumbsUp, label: "رضایت مشتریان", end: 94, suffix: "٪" },
];

const capabilities = [
  "تست نفوذ وب و موبایل",
  "امنیت چرخه توسعه",
  "تحلیل تهدید",
  "استاندارد OWASP",
];

export function HeroSection() {
  const reducedMotion = useReducedMotionPreferred();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 60]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100svh-3rem)] items-center overflow-hidden bg-[#0a1a3c] text-slate-100"
    >
      {/* Artwork. The source has its subject on the right; we mirror it so the
          shield sits on the start side and the RTL copy keeps the clear area. */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="-scale-x-100 object-cover object-right"
        />
      </motion.div>

      {/* Legibility overlays: dark on the copy side, fading over the artwork. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#081532] via-[#081532]/85 to-[#081532]/15 lg:via-[#081532]/70 lg:to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#081532]/70 via-transparent to-[#081532]/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_30%,rgba(34,211,238,0.14),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-36 sm:pt-40 lg:pb-32 lg:pt-44"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.div
            {...fadeUpProps(reducedMotion)}
            transition={motionTransition(reducedMotion, { duration: 0.6 })}
            className="max-w-2xl"
          >
            <Badge className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-cyan-200 backdrop-blur-xl">
              <Radar className="ms-0 me-2 h-3.5 w-3.5 text-cyan-300" aria-hidden />
              امنیت اپلیکیشن و تست نفوذ حرفه‌ای
            </Badge>

            <h1 className="mt-8 text-4xl font-bold leading-[1.2] text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl xl:leading-[1.15]">
              آسیب‌پذیری‌ها را
              <br />
              <span className="relative inline-block bg-gradient-to-l from-cyan-200 via-sky-300 to-cyan-100 bg-clip-text text-transparent">
                پیش از مهاجمان پیدا کنید
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-cyan-400/15 blur-xl"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              راوین‌سک با تست نفوذ، ارزیابی امنیتی و طراحی برنامه‌های امنیت اپلیکیشن، به سازمان‌ها
              کمک می‌کند ریسک‌های واقعی را شناسایی کرده و زیرساخت خود را در برابر تهدیدات سایبری
              مقاوم کنند.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-cyan-400 px-7 text-slate-950 shadow-lg shadow-cyan-500/25 hover:bg-cyan-300"
              >
                <Link href="/contact" className="group">
                  درخواست مشاوره
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/15 bg-white/5 text-slate-200 backdrop-blur-xl hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-200"
              >
                <Link href="/services">مشاهده خدمات</Link>
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="حوزه‌های تخصصی">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-xl"
                >
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {signals.map((item, i) => (
                <motion.div
                  key={item.label}
                  {...fadeUpDelayedProps(reducedMotion, 0.2 + i * 0.1)}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <item.icon className="h-4 w-4 text-cyan-300" aria-hidden />
                  <dd className="mt-3 text-2xl font-bold tabular-nums text-white sm:text-3xl">
                    <CountUp end={item.end} suffix={item.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs text-slate-400">{item.label}</dt>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          {/* The artwork shows through this column on large screens. */}
          <div className="hidden lg:block" aria-hidden />
        </div>
      </motion.div>
    </section>
  );
}
