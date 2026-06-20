"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers, Radar, ThumbsUp, Timer } from "lucide-react";

import { HeroBento } from "@/components/sections/hero-bento";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { ParticleNetwork } from "@/components/ui/particle-network";
import {
  fadeScaleProps,
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
  const { scrollY } = useScroll();

  const orbY1 = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : 70]);
  const orbY2 = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : -60]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.12),transparent_60%)]" />

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 85%)",
        }}
      />

      <ParticleNetwork className="absolute inset-0 opacity-[0.15]" />

      <motion.div
        style={{ y: orbY1 }}
        className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[180px]"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="pointer-events-none absolute -right-40 top-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-[170px]"
      />

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            {...fadeUpProps(reducedMotion)}
            transition={motionTransition(reducedMotion, { duration: 0.6 })}
          >
            <Badge className="rounded-full border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-300 backdrop-blur-xl">
              <Radar className="ml-2 h-3.5 w-3.5 animate-spin-slow text-cyan-400" />
              امنیت اپلیکیشن و تست نفوذ حرفه‌ای
            </Badge>

            <h1 className="mt-8 text-5xl font-bold leading-[1.15] sm:text-6xl lg:text-7xl text-slate-100">
              آسیب‌پذیری‌ها را
              <br />
              <span className="relative inline-block bg-gradient-to-l from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                پیش از مهاجمان پیدا کنید
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-cyan-500/10 blur-xl" />
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              راوین‌سک با تست نفوذ، ارزیابی امنیتی و طراحی برنامه‌های امنیت
              اپلیکیشن، به سازمان‌ها کمک می‌کند ریسک‌های واقعی را شناسایی کرده
              و زیرساخت خود را در برابر تهدیدات سایبری مقاوم کنند.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-gradient-to-l from-cyan-500 to-indigo-500 px-7 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
              >
                <Link href="/contact">
                  درخواست مشاوره
                  <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-slate-700 bg-slate-900/40 backdrop-blur-xl text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <Link href="/services">مشاهده خدمات</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-400 backdrop-blur-xl hover:border-cyan-500/30 hover:text-cyan-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <dl className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {signals.map((item, i) => (
                <motion.div
                  key={item.label}
                  {...fadeUpDelayedProps(reducedMotion, 0.2 + i * 0.1)}
                  className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-xl hover:border-cyan-500/30"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                  <item.icon className="h-4 w-4 text-cyan-400" />
                  <dd className="mt-3 text-3xl font-bold text-cyan-300 tabular-nums">
                    <CountUp end={item.end} suffix={item.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-sm text-slate-500">
                    {item.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div {...fadeScaleProps(reducedMotion, 0.1)} className="relative">
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/10 to-transparent blur-xl" />
            <div className="relative rounded-[32px] border border-slate-800 bg-slate-900/40 p-2 backdrop-blur-2xl shadow-2xl">
              <HeroBento />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}