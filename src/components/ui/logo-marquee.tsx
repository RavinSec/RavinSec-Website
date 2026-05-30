"use client";

import { cn } from "@/lib/utils";

type LogoMarqueeProps = {
  children: React.ReactNode;
  className?: string;
};

export function LogoMarquee({ children, className }: LogoMarqueeProps) {
  return (
    <div
      className={cn(
        "relative mt-12 overflow-hidden mask-[linear-gradient(to_left,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-x-14 motion-reduce:animate-none hover:[animation-play-state:paused] [direction:ltr]">
        <ul className="flex shrink-0 items-center gap-x-14">{children}</ul>
        <ul className="flex shrink-0 items-center gap-x-14" aria-hidden>
          {children}
        </ul>
      </div>
    </div>
  );
}
