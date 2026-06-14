"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Radar } from "lucide-react";

import { HeroBento } from "@/components/sections/hero-bento";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { Separator } from "@/components/ui/separator";
import {
  fadeScaleProps,
  fadeUpDelayedProps,
  fadeUpProps,
  motionTransition,
  useReducedMotionPreferred,
} from "@/lib/motion";

const signals = [
  { label: "میانگین زمان تحویل گزارش", end: 5, suffix: " روز" },
  { label: "پروژه‌های انجام‌شده", end: 200, suffix: "+" },
  { label: "نرخ نگه‌داشت مشتری", end: 94, suffix: "٪" },
];

export function HeroSection() {
  const reducedMotion = useReducedMotionPreferred();
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : 48]);
  const orbY2 = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : -32]);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden />
      <ParticleNetwork maxParticles={60} connectionDistance={100} />
      <div className="grid-bg absolute inset-0" />
      <motion.div
        style={{ y: orbY1 }}
        className="pointer-events-none absolute -start-32 top-20 h-72 w-72 rounded-full bg-primary/8 blur-[120px]"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="pointer-events-none absolute -end-20 top-40 h-64 w-64 rounded-full bg-primary/5 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            {...fadeUpProps(reducedMotion)}
            transition={motionTransition(reducedMotion, { duration: 0.5 })}
          >
            <Badge variant="glow" className="gap-2">
              <Radar className="h-3 w-3" aria-hidden />
              امنیت تهاجمی و دفاعی
            </Badge>

            <h1 className="heading-display mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
              ریسک را آشکار کنید.
              <br />
              آنچه <span className="text-primary">مهم است</span> را سخت‌تر کنید.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              RavinSec با تیم‌های امنیت و مهندسی همکاری می‌کند تا ضعف‌های واقعی را بیابد،
              اولویت‌بندی رفع را انجام دهد و برنامه‌هایی بسازد که مقیاس‌پذیر باشند — بدون سر و صدا.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="group gap-2">
                <Link href="/contact">
                  رزرو مشاوره
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">مشاهده خدمات</Link>
              </Button>
            </div>

            <Separator className="my-10 bg-border" />

            <dl className="grid grid-cols-3 gap-4 sm:gap-8">
              {signals.map((item, i) => (
                <motion.div key={item.label} {...fadeUpDelayedProps(reducedMotion, 0.2 + i * 0.08)}>
                  <dt className="text-xs leading-snug text-muted-foreground">{item.label}</dt>
                  <dd className="stat-value mt-1.5 text-primary">
                    <CountUp end={item.end} suffix={item.suffix} />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div {...fadeScaleProps(reducedMotion, 0.1)} className="relative">
            <HeroBento />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
