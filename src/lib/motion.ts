"use client";

import { useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

/** Shared easing curve for consistent, subtle motion across the site. */
export const motionEase = [0.25, 0.1, 0.25, 1] as const;

export function useReducedMotionPreferred(): boolean {
  return useReducedMotion() ?? false;
}

export function motionTransition(
  reduced: boolean,
  opts: Transition = { duration: 0.5, ease: motionEase },
): Transition {
  if (reduced) return { duration: 0 };
  return { ease: motionEase, ...opts };
}

export function fadeUpProps(reduced: boolean) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  };
}

export function fadeScaleProps(reduced: boolean, delay = 0.1) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay, ease: motionEase },
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
    transition: { delay, duration, ease: motionEase },
  };
}

export function fadeUpInViewProps(reduced: boolean, opts: InViewOptions = {}) {
  const { delay = 0, duration = 0.5, y = 16, margin = "-40px" } = opts;
  if (reduced) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { delay, duration, ease: motionEase },
  };
}

export function slideInViewProps(reduced: boolean, opts: InViewOptions = {}) {
  const { delay = 0, duration = 0.5, x = 20 } = opts;
  if (reduced) return {};
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { delay, duration, ease: motionEase },
  };
}

export function scaleInViewProps(reduced: boolean, opts: InViewOptions = {}) {
  const { delay = 0.2, duration = 0.5 } = opts;
  if (reduced) return {};
  return {
    initial: { opacity: 0, scale: 0.97 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { delay, duration, ease: motionEase },
  };
}

type KeyframeValue = string | number;
type Keyframes = Record<string, KeyframeValue[]>;

type LoopFramesOptions = {
  duration: number;
  reduced: boolean;
  ease?: Transition["ease"];
  delay?: number;
  /** Static values to show when motion is reduced; defaults to each track's last keyframe. */
  reducedFrames?: Record<string, KeyframeValue>;
};

/**
 * Infinite keyframe loop whose `times` may start after 0 or end before 1.
 *
 * When offsets don't span the full 0–1 range, browsers synthesise neutral
 * keyframes from the element's underlying CSS value, which blends the track
 * towards that value for the uncovered part of the loop. Padding the first and
 * last keyframes to offsets 0 and 1 makes the values hold instead.
 * Returns `animate`/`transition` props for a motion element.
 */
export function loopFrames(frames: Keyframes, times: number[], opts: LoopFramesOptions) {
  const { duration, reduced, ease = "easeInOut", delay, reducedFrames } = opts;

  if (reduced) {
    const animate: Record<string, KeyframeValue> = {};
    for (const [key, values] of Object.entries(frames)) {
      animate[key] = reducedFrames?.[key] ?? values[values.length - 1];
    }
    return { animate };
  }

  const padStart = times[0] > 0;
  const padEnd = times[times.length - 1] < 1;
  const animate: Keyframes = {};
  for (const [key, values] of Object.entries(frames)) {
    const padded = [...values];
    if (padStart) padded.unshift(values[0]);
    if (padEnd) padded.push(values[values.length - 1]);
    animate[key] = padded;
  }

  const paddedTimes = [...times];
  if (padStart) paddedTimes.unshift(0);
  if (padEnd) paddedTimes.push(1);

  return {
    animate,
    transition: {
      duration,
      delay,
      times: paddedTimes,
      repeat: Infinity,
      ease,
    } satisfies Transition,
  };
}

export function pageEnterProps(reduced: boolean) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: motionEase },
  };
}
