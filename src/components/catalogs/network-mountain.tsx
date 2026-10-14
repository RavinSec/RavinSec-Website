"use client";

import { motion } from "motion/react";

import { catalogEase, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { cn } from "@/lib/utils";

/**
 * Low-poly "network mountain" inspired by the printed AFRASI cover.
 * Geometry is generated once from a seeded PRNG so server and client output match.
 */

/** Wide canvas (10:3) so the peak stays low relative to the width it is rendered at. */
export const NETWORK_MOUNTAIN_ASPECT = "1600 / 480";
const WIDTH = 1600;
const HEIGHT = 480;
const NODE_COUNT = 90;
const LINK_DISTANCE = 128;
const PEAK = { x: 800, y: 120 } as const;

const ridge: ReadonlyArray<readonly [number, number]> = [
  [0, 452],
  [150, 400],
  [280, 322],
  [400, 272],
  [505, 326],
  [625, 236],
  [735, 152],
  [PEAK.x, PEAK.y],
  [865, 162],
  [960, 226],
  [1065, 286],
  [1175, 242],
  [1280, 276],
  [1410, 362],
  [1600, 442],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridgeY(x: number): number {
  for (let i = 1; i < ridge.length; i++) {
    const [x0, y0] = ridge[i - 1];
    const [x1, y1] = ridge[i];
    if (x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return y0 + (y1 - y0) * t;
    }
  }
  return HEIGHT;
}

type Node = { x: number; y: number; r: number; glow: boolean };
type Link = { a: number; b: number; length: number };

function buildGraph(): { nodes: Node[]; links: Link[] } {
  const rand = mulberry32(20251014);
  const nodes: Node[] = ridge.map(([x, y], i) => ({
    x,
    y,
    r: i === 7 ? 3.2 : 2.1,
    glow: i === 7,
  }));

  for (let i = 0; i < NODE_COUNT; i++) {
    const x = rand() * WIDTH;
    const top = ridgeY(x);
    const y = top + Math.pow(rand(), 1.7) * (HEIGHT - top);
    nodes.push({ x, y, r: 1 + rand() * 1.6, glow: rand() > 0.86 });
  }

  const links: Link[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const length = Math.hypot(dx, dy);
      if (length < LINK_DISTANCE) links.push({ a: i, b: j, length });
    }
  }

  return { nodes, links };
}

const graph = buildGraph();
const silhouette = `M0 ${HEIGHT} ${ridge.map(([x, y]) => `L${x} ${y}`).join(" ")} L${WIDTH} ${HEIGHT} Z`;
const flagPole = `M${PEAK.x} ${PEAK.y} V${PEAK.y - 62}`;
const flagPennant = `M${PEAK.x} ${PEAK.y - 62} L${PEAK.x + 56} ${PEAK.y - 48} L${PEAK.x} ${PEAK.y - 34} Z`;

type NetworkMountainProps = {
  className?: string;
  /** Delay (s) before the draw-on sequence starts. */
  delay?: number;
};

export function NetworkMountain({ className, delay = 0.2 }: NetworkMountainProps) {
  const reduced = useCatalogReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMax slice"
      className={cn("h-full w-full", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="nm-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nm-peak" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(165 243 252)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.path
        d={silhouette}
        fill="url(#nm-fill)"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: delay + 0.6, ease: catalogEase }}
      />

      <g stroke="rgb(103 232 249)" strokeWidth="0.8" strokeLinecap="round">
        {graph.links.map((link, i) => {
          const a = graph.nodes[link.a];
          const b = graph.nodes[link.b];
          const opacity = 0.42 - (link.length / LINK_DISTANCE) * 0.3;
          return (
            <motion.line
              key={`${link.a}-${link.b}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeOpacity={opacity}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.1, delay: delay + (i % 40) * 0.025, ease: "easeOut" },
                opacity: { duration: 0.3, delay: delay + (i % 40) * 0.025 },
              }}
            />
          );
        })}
      </g>

      <g fill="rgb(165 243 252)">
        {graph.nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fillOpacity={node.glow ? 0.95 : 0.6}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={
              node.glow && !reduced
                ? { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }
                : { scale: 1, opacity: 1 }
            }
            transition={
              node.glow && !reduced
                ? {
                    duration: 3 + (i % 5) * 0.6,
                    delay: delay + 1.2 + (i % 7) * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.5, delay: delay + 0.3 + (i % 30) * 0.03, ease: catalogEase }
            }
          />
        ))}
      </g>

      <circle cx={PEAK.x} cy={PEAK.y} r="26" fill="url(#nm-peak)" opacity="0.7" />

      <g stroke="rgb(224 242 254)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d={flagPole}
          fill="none"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 1.4, ease: "easeOut" }}
        />
        <motion.path
          d={flagPennant}
          fill="rgb(34 211 238)"
          fillOpacity="0.35"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + 1.8, ease: "easeOut" }}
        />
      </g>
    </svg>
  );
}
