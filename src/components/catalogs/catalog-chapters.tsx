"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { CatalogIcon } from "@/components/catalogs/catalog-icons";
import { Reveal, Stagger, StaggerItem, useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { Badge } from "@/components/ui/badge";
import type { CatalogChapter } from "@/lib/catalogs";

type CatalogChaptersProps = {
  chapters: CatalogChapter[];
};

/** Numbered walkthrough of the product, with a scroll-linked timeline rail. */
export function CatalogChapters({ chapters }: CatalogChaptersProps) {
  const reduced = useCatalogReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 70%"],
  });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="chapters" className="scroll-mt-32 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <Badge variant="glow" className="mb-5">
            ۰۴ · بخش‌های محصول
          </Badge>
          <h2 className="heading-display text-3xl sm:text-4xl">راهنمای بخش‌به‌بخش افراسی</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            شش بخش اصلی سامانه، به همان ترتیبی که در بروشور چاپی آمده است.
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mt-14 space-y-10 lg:space-y-14">
          {/* Timeline rail */}
          <div aria-hidden className="absolute inset-y-0 start-[1.125rem] w-px bg-border sm:start-5">
            <motion.div
              style={{ scaleY: reduced ? 1 : rail, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-primary via-sky-400 to-cyan-400"
            />
          </div>

          {chapters.map((chapter, index) => (
            <li key={chapter.id} className="relative ps-14 sm:ps-16">
              <Reveal amount={0.3} className="absolute start-0 top-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-sm font-semibold text-primary shadow-glow-primary sm:h-10 sm:w-10">
                  {index + 1}
                </span>
              </Reveal>

              <Reveal amount={0.2}>
                <article className="grid gap-6 rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-semibold sm:text-2xl">{chapter.title}</h3>
                      <span dir="ltr" className="eyebrow">
                        {chapter.label}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {chapter.description}
                    </p>

                    {chapter.bullets ? (
                      <Stagger className="mt-5 grid gap-2 sm:grid-cols-2" stagger={0.05} amount={0.4}>
                        {chapter.bullets.map((bullet) => (
                          <StaggerItem key={bullet} y={8}>
                            <div className="flex gap-2.5 text-sm text-foreground/90 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary">
                              {bullet}
                            </div>
                          </StaggerItem>
                        ))}
                      </Stagger>
                    ) : null}
                  </div>

                  <div className="relative hidden h-28 w-28 shrink-0 items-center justify-center lg:flex">
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-dashed border-primary/25"
                      animate={reduced ? undefined : { rotate: 360 }}
                      transition={reduced ? undefined : { duration: 36, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="absolute inset-3 rounded-full bg-primary/[0.06]" />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-elevated ring-1 ring-primary/15">
                      <CatalogIcon name={chapter.icon} className="h-6 w-6" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
