"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useCatalogReducedMotion } from "@/components/catalogs/reveal";
import { catalogSections, type CatalogSectionId } from "@/lib/catalogs";
import { cn } from "@/lib/utils";

type CatalogSectionNavProps = {
  catalogName: string;
};

/**
 * Sticky in-page navigation with a scroll-linked reading progress bar.
 * Sits just below the floating site header.
 */
export function CatalogSectionNav({ catalogName }: CatalogSectionNavProps) {
  const reduced = useCatalogReducedMotion();
  const [active, setActive] = useState<CatalogSectionId>(catalogSections[0].id);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const elements = catalogSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as CatalogSectionId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: CatalogSectionId) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <div className="sticky top-[4.5rem] z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6"
        aria-label={`بخش‌های کاتالوگ ${catalogName}`}
      >
        <span
          dir="ltr"
          className="hidden shrink-0 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary md:block"
        >
          {catalogName}
        </span>
        <span className="hidden h-4 w-px bg-border md:block" aria-hidden />

        <ul className="no-scrollbar -mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1">
          {catalogSections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleClick(event, section.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "interactive relative block rounded-md px-3 py-3.5 text-xs font-medium sm:text-sm",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {section.label}
                  {isActive ? (
                    <motion.span
                      layoutId="catalog-nav-indicator"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <motion.div
        aria-hidden
        style={{ scaleX: progress, transformOrigin: "100% 50%" }}
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-l from-primary via-sky-400 to-cyan-400"
      />
    </div>
  );
}
