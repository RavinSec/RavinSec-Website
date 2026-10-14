"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Motion primitives for the catalogs module, built on motion.dev (`motion/react`).
 * All primitives degrade to static rendering when the user prefers reduced motion.
 */

export const catalogEase = [0.22, 1, 0.36, 1] as const;

export const catalogViewport = { once: true, amount: 0.25 } as const;

export function useCatalogReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}

export function staggerContainer(reduced: boolean, stagger = 0.08, delay = 0.05): Variants {
  return {
    hidden: {},
    show: {
      transition: reduced ? { duration: 0 } : { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

export function staggerItem(reduced: boolean, y = 18): Variants {
  if (reduced) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } };
  }
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: catalogEase } },
  };
}

type RevealProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  amount?: number;
};

/** Fades/slides a block into view once when it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 20, amount = 0.25, ...rest }: RevealProps) {
  const reduced = useCatalogReducedMotion();

  if (reduced) {
    return (
      <motion.div className={className} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: catalogEase }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  amount?: number;
};

/** Container that staggers the entrance of its `StaggerItem` children. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0.05,
  amount = 0.2,
  ...rest
}: StaggerProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer(reduced, stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode;
  y?: number;
};

export function StaggerItem({ children, className, y = 18, ...rest }: StaggerItemProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <motion.div className={cn(className)} variants={staggerItem(reduced, y)} {...rest}>
      {children}
    </motion.div>
  );
}
