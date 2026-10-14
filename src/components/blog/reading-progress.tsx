"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useReducedMotionPreferred } from "@/lib/motion";

/** Thin progress bar pinned to the top edge while reading an article. */
export function ReadingProgress() {
  const reduced = useReducedMotionPreferred();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-l from-primary via-[hsl(217,91%,55%)] to-cyan-400 rtl:origin-right"
    />
  );
}
