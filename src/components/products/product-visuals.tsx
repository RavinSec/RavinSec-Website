"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileCheck2,
  Globe,
  MonitorSmartphone,
  ShieldCheck,
  Usb,
} from "lucide-react";

import { loopFrames, motionEase, useReducedMotionPreferred } from "@/lib/motion";
import type { ProductVisualKey } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Looping, decorative product illustrations rendered as dark "device screens".
 * They sit on both the dark home showcase and the light products page.
 * Everything is aria-hidden; the surrounding copy carries the meaning.
 */

type VisualProps = { className?: string };

function Screen({ className, children }: VisualProps & { children: React.ReactNode }) {
  return (
    <div
      dir="ltr"
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#071530] text-slate-200 shadow-elevated",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.16),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
      {children}
    </div>
  );
}

function ScreenHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ms-2 whitespace-nowrap font-mono text-[0.65rem] font-semibold tracking-wider text-cyan-200">
          {title}
        </span>
      </div>
      <span className="hidden whitespace-nowrap font-mono text-[0.6rem] text-slate-400 sm:inline">{meta}</span>
    </div>
  );
}

/* ---------------------------------- AfraSI --------------------------------- */

const AFRASI_LOOP = 7;

const afrasiPhases = [
  { key: "input", label: "دریافت فایل از فلش یا پنل وب", times: [0, 0.03, 0.24, 0.27] },
  { key: "scan", label: "اسکن هم‌زمان با چند موتور آنتی‌ویروس", times: [0.27, 0.3, 0.62, 0.65] },
  { key: "verdict", label: "فایل امن — تحویل به کیوسک و مرورگر ایزوله", times: [0.65, 0.68, 0.95, 0.98] },
] as const;

const engines = ["Engine A", "Engine B", "Engine C"];

const idleDot = "rgba(148,163,184,0.35)";
const cyan = "rgb(34,211,238)";
const emerald = "rgb(52,211,153)";

export function AfrasiVisual({ className }: VisualProps) {
  const reduced = useReducedMotionPreferred();
  const base = { duration: AFRASI_LOOP, reduced };

  return (
    <Screen className={cn("aspect-[4/3] sm:aspect-[16/10]", className)}>
      <ScreenHeader title="AfraSI" meta="file-gateway · multi-av" />

      <div className="relative grid h-[calc(100%-2.5rem)] grid-cols-[1fr_1.35fr_1fr] items-center gap-2 px-4 pb-9 pt-3 sm:gap-4 sm:px-6">
        {/* Input node */}
        <div className="relative flex flex-col items-center gap-2">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-200 sm:h-14 sm:w-14"
            {...loopFrames(
              { borderColor: ["rgba(34,211,238,0.25)", "rgba(34,211,238,0.7)", "rgba(34,211,238,0.25)"] },
              [0, 0.06, 0.24],
              base,
            )}
          >
            <Usb className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
          <span className="font-mono text-[0.55rem] uppercase tracking-wider text-slate-400 sm:text-[0.6rem]">
            USB · Web
          </span>

          {/* Travelling file (input → engines) */}
          <motion.div
            className="absolute left-[60%] top-5 flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-white/10 text-slate-100 shadow-soft sm:top-6"
            {...loopFrames(
              { x: ["0%", "0%", "260%", "260%"], opacity: [0, 1, 1, 0] },
              [0, 0.06, 0.26, 0.3],
              { ...base, reducedFrames: { opacity: 0, x: "0%" } },
            )}
          >
            <FileCheck2 className="h-3.5 w-3.5" />
          </motion.div>
        </div>

        {/* Engines */}
        <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-2 sm:p-3">
          <motion.div
            className="pointer-events-none absolute inset-y-1 left-0 w-10 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
            {...loopFrames(
              { x: ["-40px", "-40px", "260%", "260%"], opacity: [0, 1, 1, 0] },
              [0, 0.3, 0.6, 0.62],
              { ...base, ease: "linear", reducedFrames: { opacity: 0, x: "-40px" } },
            )}
          />
          <div className="space-y-1.5 sm:space-y-2">
            {engines.map((engine, i) => {
              const t0 = 0.36 + i * 0.08;
              return (
                <div
                  key={engine}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-[#0b1d3f] px-2 py-1.5 sm:px-3"
                >
                  <span className="font-mono text-[0.55rem] text-slate-300 sm:text-[0.65rem]">{engine}</span>
                  <motion.span
                    className="h-2 w-2 rounded-full"
                    {...loopFrames(
                      {
                        backgroundColor: [idleDot, idleDot, cyan, emerald, emerald, idleDot],
                        boxShadow: [
                          "0 0 0px rgba(34,211,238,0)",
                          "0 0 0px rgba(34,211,238,0)",
                          "0 0 10px rgba(34,211,238,0.8)",
                          "0 0 10px rgba(52,211,153,0.8)",
                          "0 0 10px rgba(52,211,153,0.8)",
                          "0 0 0px rgba(52,211,153,0)",
                        ],
                      },
                      [0, 0.3, t0, t0 + 0.07, 0.95, 0.98],
                      { ...base, reducedFrames: { backgroundColor: emerald, boxShadow: "0 0 10px rgba(52,211,153,0.8)" } },
                    )}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-center font-mono text-[0.55rem] uppercase tracking-wider text-slate-400 sm:text-[0.6rem]">
            Multi-AV scan
          </div>
        </div>

        {/* Verdict + destinations */}
        <div className="relative flex flex-col items-center gap-2">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl border text-white sm:h-14 sm:w-14"
            {...loopFrames(
              {
                backgroundColor: ["rgba(16,185,129,0.1)", "rgba(16,185,129,0.1)", "rgb(16,185,129)", "rgb(16,185,129)", "rgba(16,185,129,0.1)"],
                borderColor: ["rgba(16,185,129,0.25)", "rgba(16,185,129,0.25)", "rgba(16,185,129,0.6)", "rgba(16,185,129,0.6)", "rgba(16,185,129,0.25)"],
                boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 0px rgba(16,185,129,0)", "0 0 28px rgba(16,185,129,0.55)", "0 0 28px rgba(16,185,129,0.55)", "0 0 0px rgba(16,185,129,0)"],
              },
              [0, 0.65, 0.7, 0.95, 0.98],
              {
                ...base,
                reducedFrames: {
                  backgroundColor: "rgb(16,185,129)",
                  borderColor: "rgba(16,185,129,0.6)",
                  boxShadow: "0 0 28px rgba(16,185,129,0.55)",
                },
              },
            )}
          >
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
          <div className="flex gap-1.5">
            {[MonitorSmartphone, Globe].map((Icon, i) => (
              <motion.span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-300"
                {...loopFrames(
                  { opacity: [0.35, 0.35, 1, 1, 0.35], y: [0, 0, -2, -2, 0] },
                  [0, 0.72 + i * 0.05, 0.77 + i * 0.05, 0.95, 0.98],
                  { ...base, reducedFrames: { opacity: 1, y: 0 } },
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Connector line */}
        <div className="pointer-events-none absolute left-[22%] right-[22%] top-[38%] -z-10 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 sm:top-[36%]" />
      </div>

      {/* Phase label + progress */}
      <div className="absolute inset-x-4 bottom-2.5 sm:inset-x-6">
        <div className="relative h-4">
          {afrasiPhases.map((phase) => (
            <motion.span
              key={phase.key}
              dir="rtl"
              className="absolute inset-0 truncate text-right text-[0.6rem] text-slate-300 sm:text-[0.65rem]"
              {...loopFrames({ opacity: [0, 1, 1, 0] }, [...phase.times], {
                ...base,
                reducedFrames: { opacity: phase.key === "verdict" ? 1 : 0 },
              })}
            >
              {phase.label}
            </motion.span>
          ))}
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
            {...loopFrames({ scaleX: [0, 1, 1, 0] }, [0, 0.9, 0.97, 1], {
              ...base,
              ease: "linear",
              reducedFrames: { scaleX: 1 },
            })}
          />
        </div>
      </div>
    </Screen>
  );
}

/* --------------------------------- AI Pentest ------------------------------- */

const PENTEST_LOOP = 8;

const findings = [
  { severity: "Critical", color: "bg-rose-500", text: "text-rose-300", title: "SQLi · /api/v2/orders", width: "92%" },
  { severity: "High", color: "bg-orange-400", text: "text-orange-300", title: "IDOR · /users/{id}/export", width: "74%" },
  { severity: "Medium", color: "bg-amber-300", text: "text-amber-200", title: "JWT alg confusion", width: "52%" },
  { severity: "Low", color: "bg-sky-400", text: "text-sky-300", title: "Verbose stack traces", width: "28%" },
];

const surfaceNodes = Array.from({ length: 18 }, (_, i) => i);
const hotNodes = new Set([4, 9, 14]);

export function PentestAiVisual({ className }: VisualProps) {
  const reduced = useReducedMotionPreferred();
  const base = { duration: PENTEST_LOOP, reduced, ease: motionEase };

  return (
    <Screen className={cn("aspect-[4/3] sm:aspect-[16/10]", className)}>
      <ScreenHeader title="ravinsec · ai-pentest" meta="run #214 · scope: 3 apps" />

      <div className="relative grid h-[calc(100%-2.5rem)] grid-cols-[1fr_1.5fr] gap-3 p-3 sm:gap-4 sm:p-4">
        {/* Attack surface map */}
        <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.55rem] uppercase tracking-wider text-slate-400 sm:text-[0.6rem]">
              Attack surface
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              {...loopFrames({ opacity: [0.3, 1, 0.3] }, [0, 0.5, 1], { duration: 1.6, reduced })}
            />
          </div>
          <div className="mt-2 grid flex-1 grid-cols-6 content-center gap-1.5 sm:gap-2">
            {surfaceNodes.map((n) => {
              const t = 0.04 + (n / surfaceNodes.length) * 0.3;
              const hot = hotNodes.has(n);
              const on = hot ? 1 : 0.55;
              return (
                <motion.span
                  key={n}
                  className={cn("aspect-square rounded-[3px]", hot ? "bg-rose-400" : "bg-cyan-300")}
                  {...loopFrames(
                    { opacity: [0.08, 0.08, on, on, 0.08], scale: [0.6, 0.6, 1, 1, 0.6] },
                    [0, t, t + 0.05, 0.94, 0.99],
                    { ...base, reducedFrames: { opacity: on, scale: 1 } },
                  )}
                />
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[0.55rem] text-slate-400 sm:text-[0.6rem]">
            <span>hosts 12</span>
            <span>endpoints 318</span>
          </div>
        </div>

        {/* Findings + LLM report */}
        <div className="flex flex-col gap-2">
          <div className="flex-1 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:space-y-2 sm:p-3">
            {findings.map((f, i) => {
              const t = 0.22 + i * 0.1;
              return (
                <motion.div
                  key={f.title}
                  className="flex items-center gap-2"
                  {...loopFrames(
                    { opacity: [0, 0, 1, 1, 0], x: [8, 8, 0, 0, 0] },
                    [0, t, t + 0.05, 0.94, 0.99],
                    { ...base, reducedFrames: { opacity: 1, x: 0 } },
                  )}
                >
                  <span className={cn("w-[3.1rem] shrink-0 font-mono text-[0.5rem] font-semibold uppercase sm:text-[0.55rem]", f.text)}>
                    {f.severity}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-[0.55rem] text-slate-200 sm:text-[0.6rem]">{f.title}</div>
                    <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={cn("h-full origin-left rounded-full", f.color)}
                        style={{ width: f.width }}
                        {...loopFrames(
                          { scaleX: [0, 0, 1, 1, 0] },
                          [0, t + 0.04, t + 0.12, 0.94, 0.99],
                          { ...base, reducedFrames: { scaleX: 1 } },
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-2.5 py-2 sm:px-3">
            <motion.span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/20 text-violet-200"
              {...loopFrames({ rotate: [0, 0, 360, 360] }, [0, 0.78, 0.9, 1], { ...base, reducedFrames: { rotate: 0 } })}
            >
              <BrainCircuit className="h-3.5 w-3.5" />
            </motion.span>
            <div className="relative h-4 flex-1 overflow-hidden">
              <motion.span
                dir="rtl"
                className="absolute inset-0 truncate text-right text-[0.6rem] text-violet-100 sm:text-[0.65rem]"
                {...loopFrames({ opacity: [1, 1, 0, 0, 1] }, [0, 0.78, 0.82, 0.98, 1], { ...base, reducedFrames: { opacity: 0 } })}
              >
                LLM در حال تولید PoC و گزارش…
              </motion.span>
              <motion.span
                dir="rtl"
                className="absolute inset-0 truncate text-right text-[0.6rem] font-medium text-emerald-200 sm:text-[0.65rem]"
                {...loopFrames({ opacity: [0, 0, 1, 1, 0] }, [0, 0.8, 0.84, 0.96, 0.99], { ...base, reducedFrames: { opacity: 1 } })}
              >
                گزارش فنی و مدیریتی آماده شد
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

export function ProductVisual({ visual, className }: { visual: ProductVisualKey; className?: string }) {
  if (visual === "afrasi") return <AfrasiVisual className={className} />;
  return <PentestAiVisual className={className} />;
}
