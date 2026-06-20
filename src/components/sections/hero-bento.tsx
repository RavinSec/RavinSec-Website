import { Clock, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
      {children}
    </div>
  );
}

const tiles = [
  {
    id: "stat",
    featured: true,
    className: "col-span-1 row-span-2 flex flex-col justify-between",
    content: (
      <>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          پروژه‌های انجام‌شده
        </p>
        <p className="font-display text-5xl font-bold tracking-tight text-cyan-300">
          ۲۰۰+
        </p>
        <p className="text-xs leading-relaxed text-slate-500">
          سازمان‌های دولتی و خصوصی
        </p>
      </>
    ),
  },
  {
    id: "evidence",
    className: "col-span-1",
    content: (
      <div className="flex items-start gap-3">
        <IconChip>
          <ShieldCheck className="h-4 w-4" />
        </IconChip>
        <div>
          <p className="text-sm font-medium text-slate-200">
            یافته‌های مبتنی بر شواهد
          </p>
          <p className="mt-1 text-xs text-slate-500">
            PoC و مسیر رفع مستند
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "nda",
    className: "col-span-1",
    content: (
      <div className="flex items-start gap-3">
        <IconChip>
          <Lock className="h-4 w-4" />
        </IconChip>
        <div>
          <p className="text-sm font-medium text-slate-200">
            تحویل با رعایت NDA
          </p>
          <p className="mt-1 text-xs text-slate-500">
            محرمانگی کامل داده‌ها
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "delivery",
    className: "col-span-2",
    content: (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <IconChip>
            <Clock className="h-4 w-4" />
          </IconChip>
          <div>
            <p className="text-sm font-medium text-slate-200">
              میانگین زمان تحویل گزارش
            </p>
            <p className="mt-1 text-xs text-slate-500">
              از شروع تا گزارش نهایی
            </p>
          </div>
        </div>

        <p className="font-display text-2xl font-semibold text-cyan-300">
          ۵ روز
        </p>
      </div>
    ),
  },
];

export function HeroBento() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className={cn(
            "rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-cyan-500/10",
            tile.featured &&
              "border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-slate-900/40 to-indigo-500/5",
            tile.className
          )}
        >
          {tile.content}
        </div>
      ))}
    </div>
  );
}