"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { toPersianDigits } from "@/lib/format";
import { useReducedMotionPreferred } from "@/lib/motion";

type CountUpProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 1.2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotionPreferred();
  const [display, setDisplay] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setDisplay(end);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(end * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, end, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {toPersianDigits(display)}
      {suffix}
    </span>
  );
}
