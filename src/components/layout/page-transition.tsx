"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { pageEnterProps, useReducedMotionPreferred } from "@/lib/motion";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const reducedMotion = useReducedMotionPreferred();

  return (
    <motion.div {...pageEnterProps(reducedMotion)} className={className}>
      {children}
    </motion.div>
  );
}
