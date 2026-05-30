import { Clock, Lock, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

const tiles = [
  {
    id: "stat",
    className: "col-span-1 row-span-2 flex flex-col justify-between",
    content: (
      <>
        <p className="text-xs text-muted-foreground">پروژه‌های انجام‌شده</p>
        <p className="font-display text-4xl font-semibold tracking-tight text-primary">۲۰۰+</p>
        <p className="text-xs text-muted-foreground">سازمان‌های دولتی و خصوصی</p>
      </>
    ),
  },
  {
    id: "evidence",
    className: "col-span-1",
    content: (
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
        <div>
          <p className="text-sm font-medium">یافته‌های مبتنی بر شواهد</p>
          <p className="mt-1 text-xs text-muted-foreground">PoC و مسیر رفع مستند</p>
        </div>
      </div>
    ),
  },
  {
    id: "nda",
    className: "col-span-1",
    content: (
      <div className="flex items-start gap-3">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-medium">تحویل با رعایت NDA</p>
          <p className="mt-1 text-xs text-muted-foreground">محرمانگی کامل داده‌ها</p>
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
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="text-sm font-medium">میانگین زمان تحویل گزارش</p>
            <p className="mt-1 text-xs text-muted-foreground">از شروع تا گزارش نهایی</p>
          </div>
        </div>
        <p className="font-display text-2xl font-semibold text-foreground">۵ روز</p>
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
            "rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm",
            tile.className,
          )}
        >
          {tile.content}
        </div>
      ))}
    </div>
  );
}
