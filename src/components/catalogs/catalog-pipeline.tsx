"use client";

import { motion } from "motion/react";

import { CatalogIcon } from "@/components/catalogs/catalog-icons";
import { catalogEase, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import type { CatalogPipelineStep } from "@/lib/catalogs";
import { loopFrames } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LOOP = 5.2;

type CatalogPipelineProps = {
  steps: CatalogPipelineStep[];
  className?: string;
};

/**
 * Animated ingress → scan → egress flow. A "file" packet travels along the
 * connectors while scan engines light up in sequence. RTL: flow runs right → left.
 */
export function CatalogPipeline({ steps, className }: CatalogPipelineProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <motion.ol
      className={cn("relative flex flex-col gap-0 md:flex-row md:items-stretch", className)}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
      aria-label="مسیر عبور فایل در افراسی"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isScan = index === 1;

        return (
          <li key={step.id} className="contents">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: catalogEase } },
              }}
              className={cn(
                "relative flex-1 rounded-2xl border bg-white p-5 shadow-soft",
                isScan ? "border-primary/30 ring-1 ring-primary/10" : "border-border",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    isScan ? "bg-primary text-primary-foreground shadow-glow-primary" : "bg-primary/10 text-primary",
                  )}
                >
                  <CatalogIcon name={step.icon} className="h-5 w-5" />
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>

              {step.chips ? (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`جزئیات ${step.title}`}>
                  {step.chips.map((chip, chipIndex) => (
                    <motion.li
                      key={chip}
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-[0.7rem] font-medium",
                        isScan ? "border-primary/25 bg-primary/5 text-primary" : "border-border bg-muted text-muted-foreground",
                      )}
                      {...(isScan && !reduced
                        ? loopFrames(
                            { opacity: [0.45, 1, 1, 0.45], scale: [1, 1.04, 1.04, 1] },
                            [0.3 + chipIndex * 0.08, 0.36 + chipIndex * 0.08, 0.62, 0.7],
                            { duration: LOOP, reduced },
                          )
                        : {})}
                    >
                      {chip}
                    </motion.li>
                  ))}
                </ul>
              ) : null}

              {isLast ? (
                <motion.span
                  aria-hidden
                  className="absolute -start-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md"
                  animate={reduced ? undefined : { scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                  transition={
                    reduced
                      ? undefined
                      : { duration: LOOP, times: [0, 0.74, 0.8, 0.95, 1], repeat: Infinity, ease: catalogEase }
                  }
                >
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 10.5 8.5 14 15 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              ) : null}
            </motion.div>

            {!isLast ? <Connector index={index} reduced={reduced} /> : null}
          </li>
        );
      })}
    </motion.ol>
  );
}

function Connector({ index, reduced }: { index: number; reduced: boolean }) {
  // Packet timing: first connector during 0.1–0.3 of the loop, second during 0.62–0.76.
  const times = index === 0 ? [0, 0.1, 0.3, 0.32, 1] : [0, 0.62, 0.76, 0.78, 1];

  return (
    <div aria-hidden className="relative flex items-center justify-center md:w-12 md:shrink-0">
      {/* Mobile: vertical connector */}
      <div className="relative h-10 w-px bg-gradient-to-b from-border via-primary/40 to-border md:hidden">
        <motion.span
          className="absolute -start-1 top-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
          animate={reduced ? undefined : { top: ["0%", "0%", "100%", "100%", "100%"], opacity: [0, 1, 1, 0, 0] }}
          transition={reduced ? undefined : { duration: LOOP, times, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Desktop: horizontal connector (RTL → packet travels right → left) */}
      <div className="relative hidden h-px w-full bg-gradient-to-l from-border via-primary/40 to-border md:block">
        <motion.span
          className="absolute -top-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
          style={{ right: 0 }}
          animate={
            reduced
              ? { opacity: 0 }
              : { right: ["0%", "0%", "100%", "100%", "100%"], opacity: [0, 1, 1, 0, 0] }
          }
          transition={reduced ? undefined : { duration: LOOP, times, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
