"use client";

import { useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

export function useReducedMotionPreferred(): boolean {
  return useReducedMotion() ?? false;
}

export function motionTransition(
  reduced: boolean,
  opts: Transition = { duration: 0.5 },
): Transition {
  if (reduced) return { duration: 0 };
  return opts;
}

export function fadeUpProps(reduced: boolean) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
}

export function fadeScaleProps(reduced: boolean, delay = 0.1) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.55, delay },
  };
}

type InViewOptions = {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  margin?: string;
};

export function fadeUpDelayedProps(reduced: boolean, delay = 0, duration = 0.4, y = 12) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration },
  };
}

export function fadeUpInViewProps(reduced: boolean, opts: InViewOptions = {}) {
  const { delay = 0, duration = 0.5, y = 20, margin = "-40px" } = opts;
  if (reduced) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { delay, duration },
  };
}

export function slideInViewProps(reduced: boolean, opts: InViewOptions = {}) {
  const { delay = 0, duration = 0.5, x = 20 } = opts;
  if (reduced) return {};
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { delay, duration },
  };
}

export function scaleInViewProps(reduced: boolean, opts: InViewOptions = {}) {
  const { delay = 0.2, duration = 0.6 } = opts;
  if (reduced) return {};
  return {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { delay, duration },
  };
}

export function pageEnterProps(reduced: boolean) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" as const },
  };
}
