"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

import type { PostHeading } from "@/lib/lexical-text";
import { cn } from "@/lib/utils";

type PostTocProps = {
  headings: PostHeading[];
  className?: string;
};

/** Table of contents that highlights the heading currently in view. */
export function PostToc({ headings, className }: PostTocProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="فهرست مطالب" className={className}>
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-foreground">
        <List className="h-3.5 w-3.5 text-primary" aria-hidden />
        فهرست مطالب
      </div>
      <ol className="relative space-y-0.5 border-s border-border">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "-ms-px block border-s-2 py-1.5 text-[0.8125rem] leading-snug transition-colors",
                  heading.level === 3 ? "ps-6" : "ps-3",
                  active
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
                aria-current={active ? "location" : undefined}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
