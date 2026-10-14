"use client";

import { motion } from "motion/react";
import { Globe, Lock, ShieldCheck, Usb } from "lucide-react";

import { catalogEase, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { loopFrames } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Looping product illustrations for the spotlight cards.
 * Decorative only (aria-hidden); the surrounding copy carries the meaning.
 */

const KIOSK_LOOP = 6.4;

const kioskStates = [
  { key: "idle", label: "فلش را وصل کنید", times: [0, 0.02, 0.2, 0.24] },
  { key: "upload", label: "در حال ارسال به سرور…", times: [0.24, 0.27, 0.54, 0.57] },
  { key: "scan", label: "اسکن با چند موتور", times: [0.57, 0.6, 0.74, 0.77] },
  { key: "safe", label: "امن — آماده دریافت", times: [0.77, 0.8, 0.95, 0.98] },
] as const;

const engineIdle = "rgba(34,211,238,0.1)";
const engineClean = "rgba(16,185,129,0.55)";

export function KioskVisual({ className }: { className?: string }) {
  const reduced = useCatalogReducedMotion();
  const base = { duration: KIOSK_LOOP, reduced };

  return (
    <div
      dir="ltr"
      aria-hidden
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-slate-50 to-white",
        className,
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* Monitor */}
      <div className="absolute left-1/2 top-[12%] w-[66%] -translate-x-1/2">
        <div className="relative rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-elevated">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#0a1e3a]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.18),transparent_60%)]" />

            <div className="relative flex items-center justify-between border-b border-white/10 px-3 py-1.5">
              <span className="font-mono text-[0.55rem] font-semibold tracking-wider text-cyan-200">
                AfraKiosk
              </span>
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                {...loopFrames({ opacity: [0.4, 1, 0.4] }, [0, 0.5, 1], { duration: 1.8, reduced })}
              />
            </div>

            {/* Center state icon */}
            <div className="relative flex h-[58%] items-center justify-center">
              <motion.div
                className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                {...loopFrames(
                  { opacity: [1, 1, 0, 0, 1], scale: [1, 1, 0.9, 0.9, 1] },
                  [0, 0.2, 0.24, 0.96, 1],
                  { ...base, reducedFrames: { opacity: 0, scale: 0.9 } },
                )}
              >
                <Usb className="h-4 w-4" />
              </motion.div>

              <motion.div
                className="absolute flex items-center gap-1"
                {...loopFrames({ opacity: [0, 0, 1, 1, 0] }, [0, 0.57, 0.6, 0.74, 0.77], {
                  ...base,
                  reducedFrames: { opacity: 0 },
                })}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-6 w-6 rounded-md border border-cyan-400/30 bg-cyan-400/10"
                    {...loopFrames(
                      { backgroundColor: [engineIdle, engineIdle, engineClean, engineClean, engineIdle] },
                      [0, 0.6 + i * 0.04, 0.63 + i * 0.04, 0.74, 0.77],
                      base,
                    )}
                  />
                ))}
              </motion.div>

              <motion.div
                className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.6)]"
                {...loopFrames(
                  { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.8] },
                  [0, 0.77, 0.81, 0.95, 0.98],
                  { ...base, reducedFrames: { opacity: 1, scale: 1 } },
                )}
              >
                <ShieldCheck className="h-5 w-5" />
              </motion.div>
            </div>

            {/* Status + progress */}
            <div className="absolute inset-x-3 bottom-2">
              <div className="relative h-3.5">
                {kioskStates.map((state) => (
                  <motion.span
                    key={state.key}
                    dir="rtl"
                    className="absolute inset-0 text-right text-[0.55rem] text-slate-300"
                    {...loopFrames({ opacity: [0, 1, 1, 0] }, [...state.times], {
                      ...base,
                      reducedFrames: { opacity: state.key === "safe" ? 1 : 0 },
                    })}
                  >
                    {state.label}
                  </motion.span>
                ))}
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                  {...loopFrames({ scaleX: [0, 0, 1, 1, 1, 0] }, [0, 0.24, 0.54, 0.77, 0.96, 1], {
                    ...base,
                    reducedFrames: { scaleX: 1 },
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Stand */}
        <div className="mx-auto h-5 w-[14%] rounded-b-md bg-gradient-to-b from-slate-700 to-slate-800" />
        <div className="mx-auto h-1.5 w-[36%] rounded-full bg-slate-700/80" />
      </div>

      {/* USB stick travelling into the kiosk */}
      <motion.div
        className="absolute bottom-[14%] left-[8%] flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-600 shadow-soft"
        {...loopFrames(
          { x: [0, 0, 56, 56, 56, 0], opacity: [1, 1, 1, 0.35, 0.35, 1] },
          [0, 0.04, 0.2, 0.24, 0.96, 1],
          { ...base, reducedFrames: { x: 0, opacity: 1 } },
        )}
      >
        <Usb className="h-3.5 w-3.5" />
        <span className="font-mono text-[0.55rem]">USB</span>
        <motion.span
          className="absolute -right-10 top-1/2 h-px w-10 -translate-y-1/2 bg-gradient-to-r from-primary/60 to-transparent"
          {...loopFrames({ opacity: [0, 1, 1, 0, 0] }, [0, 0.06, 0.18, 0.22, 1], {
            ...base,
            reducedFrames: { opacity: 0 },
          })}
        />
      </motion.div>

      {/* Server node receiving the upload */}
      <div className="absolute bottom-[14%] right-[8%] flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-600 shadow-soft">
        <span className="font-mono text-[0.55rem]">AfraAV</span>
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-primary"
          {...loopFrames(
            { opacity: [0.3, 0.3, 1, 1, 0.3], scale: [1, 1, 1.4, 1.4, 1] },
            [0, 0.24, 0.3, 0.74, 0.8],
            { ...base, reducedFrames: { opacity: 1, scale: 1 } },
          )}
        />
      </div>
    </div>
  );
}

const BROWSER_LOOP = 7;

const threats = [
  { from: { x: -140, y: -90 }, delay: 0 },
  { from: { x: 150, y: -70 }, delay: 2.4 },
  { from: { x: 130, y: 110 }, delay: 4.6 },
];

export function IsolatedBrowserVisual({ className }: { className?: string }) {
  const reduced = useCatalogReducedMotion();

  return (
    <div
      dir="ltr"
      aria-hidden
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-slate-50 to-white",
        className,
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* Isolation boundary */}
      <div className="absolute left-1/2 top-1/2 h-[82%] aspect-square -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          {...loopFrames({ scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }, [0, 0.5, 1], {
            duration: 3.2,
            reduced,
          })}
        />
        <div className="absolute inset-[6%] rounded-full bg-primary/[0.04]" />

        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-white px-2.5 py-1 text-[0.6rem] font-medium text-emerald-700 shadow-soft">
          <ShieldCheck className="h-3 w-3" />
          <span dir="rtl">مرز ایزوله</span>
        </div>
      </div>

      {/* Blocked threats */}
      {threats.map((threat, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
          initial={reduced ? { opacity: 0 } : false}
          animate={
            reduced
              ? undefined
              : {
                  x: [threat.from.x * 1.6, threat.from.x * 0.95, threat.from.x * 0.95],
                  y: [threat.from.y * 1.6, threat.from.y * 0.95, threat.from.y * 0.95],
                  opacity: [0, 1, 0],
                  scale: [0.6, 1, 2.2],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 2.2,
                  times: [0, 0.75, 1],
                  delay: threat.delay,
                  repeat: Infinity,
                  repeatDelay: BROWSER_LOOP - 2.2,
                  ease: ["easeIn", "easeOut"],
                }
          }
        />
      ))}

      {/* Browser window */}
      <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          <div className="ml-2 flex flex-1 items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[0.5rem] text-slate-500 ring-1 ring-slate-200">
            <Lock className="h-2 w-2 text-emerald-600" />
            <span className="font-mono">https://</span>
            <motion.span
              className="h-2 w-px bg-slate-400"
              {...loopFrames({ opacity: [1, 0, 1] }, [0, 0.5, 1], { duration: 1.1, reduced, ease: "linear" })}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-[auto_1fr] items-center gap-3 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <motion.span
              animate={reduced ? undefined : { rotate: 360 }}
              transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex"
            >
              <Globe className="h-5 w-5" />
            </motion.span>
          </div>
          <div className="space-y-1.5">
            {[90, 70, 80].map((width, i) => (
              <div key={i} className="relative h-1.5 overflow-hidden rounded bg-slate-100" style={{ width: `${width}%` }}>
                <motion.span
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
                  animate={reduced ? undefined : { x: ["-100%", "250%"] }}
                  transition={reduced ? undefined : { duration: 2.4, delay: i * 0.25, repeat: Infinity, ease: catalogEase }}
                />
              </div>
            ))}
          </div>
        </div>

        <div dir="rtl" className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-2 py-1 text-[0.5rem] text-slate-500">
          <span>رندر دور از شبکه داخلی</span>
          <span className="rounded bg-emerald-500/10 px-1 py-0.5 font-medium text-emerald-700">دانلود → اسکن</span>
        </div>
      </div>
    </div>
  );
}
