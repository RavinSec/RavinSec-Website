import { Clock, Lock, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          پروژه‌های انجام‌شده
        </p>
        <p className="font-display text-5xl font-bold tracking-tight text-primary">۲۰۰+</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
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
          <ShieldCheck className="h-4 w-4" aria-hidden />
        </IconChip>
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
        <IconChip>
          <Lock className="h-4 w-4" aria-hidden />
        </IconChip>
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
          <IconChip>
            <Clock className="h-4 w-4" aria-hidden />
          </IconChip>
          <div>
            <p className="text-sm font-medium">میانگین زمان تحویل گزارش</p>
            <p className="mt-1 text-xs text-muted-foreground">از شروع تا گزارش نهایی</p>
          </div>
        </div>
        <p className="font-display text-2xl font-semibold text-primary">۵ روز</p>
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
            "rounded-2xl border border-border bg-white p-5 shadow-soft transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-elevated motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            "featured" in tile && tile.featured && "border-primary/20 bg-gradient-to-br from-primary/5 to-white",
            tile.className,
          )}
        >
          {tile.content}
        </div>
      ))}
    </div>
  );
}
