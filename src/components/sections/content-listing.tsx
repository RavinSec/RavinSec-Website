"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FileSearch, LayoutGrid } from "lucide-react";

import { ContentPostCard } from "@/components/sections/content-post-card";
import { getCategoryLabel } from "@/lib/content-categories";
import type { ContentBasePath, ContentPost } from "@/lib/content";
import { toPersianDigits } from "@/lib/format";
import { fadeUpInViewProps, motionEase, useReducedMotionPreferred } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ContentListingProps = {
  posts: ContentPost[];
  basePath: ContentBasePath;
  emptyMessage: string;
  /** Promote the newest post to a large editorial card. */
  showFeatured?: boolean;
  /** Section label above the grid, e.g. "آخرین مقالات". */
  gridTitle?: string;
};

const ALL = "all";

export function ContentListing({
  posts,
  basePath,
  emptyMessage,
  showFeatured = true,
  gridTitle,
}: ContentListingProps) {
  const reduced = useReducedMotionPreferred();
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      if (!post.category) continue;
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count, label: getCategoryLabel(value) ?? value }));
  }, [posts]);

  if (posts.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  const filtered = active === ALL ? posts : posts.filter((post) => post.category === active);
  const featured = showFeatured && active === ALL ? filtered[0] : undefined;
  const gridPosts = featured ? filtered.slice(1) : filtered;
  const showFilters = categories.length > 1;

  return (
    <div className="space-y-10">
      {showFilters ? (
        <motion.div
          {...fadeUpInViewProps(reduced, { y: 10 })}
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="فیلتر دسته‌بندی"
        >
          <LayoutGroup id={`filters-${basePath}`}>
            <FilterPill
              active={active === ALL}
              onClick={() => setActive(ALL)}
              label="همه"
              count={posts.length}
              reduced={reduced}
            />
            {categories.map((category) => (
              <FilterPill
                key={category.value}
                active={active === category.value}
                onClick={() => setActive(category.value)}
                label={category.label}
                count={category.count}
                reduced={reduced}
              />
            ))}
          </LayoutGroup>
        </motion.div>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        {featured ? (
          <motion.div
            key="featured"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: motionEase }}
          >
            <ContentPostCard post={featured} basePath={basePath} variant="featured" priority />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {gridPosts.length > 0 ? (
        <section aria-live="polite">
          {gridTitle && featured ? (
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-semibold tracking-tight">{gridTitle}</h2>
              <span className="font-mono text-xs text-muted-foreground">
                {toPersianDigits(gridPosts.length)} مطلب
              </span>
            </div>
          ) : null}
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {gridPosts.map((post) => (
                <motion.li
                  key={post.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: motionEase }}
                  className="h-full"
                >
                  <ContentPostCard post={post} basePath={basePath} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </section>
      ) : !featured ? (
        <EmptyState message="در این دسته‌بندی هنوز مطلبی منتشر نشده است." compact />
      ) : null}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
  reduced,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  reduced: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40",
        active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {active ? (
        <motion.span
          layoutId="content-filter-pill"
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary shadow-glow-primary"
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
        />
      ) : (
        <span aria-hidden className="absolute inset-0 rounded-full border border-border bg-white" />
      )}
      <span className="relative">{label}</span>
      <span
        className={cn(
          "relative font-mono text-[0.65rem]",
          active ? "text-primary-foreground/80" : "text-muted-foreground/70",
        )}
      >
        {toPersianDigits(count)}
      </span>
    </button>
  );
}

function EmptyState({ message, compact }: { message: string; compact?: boolean }) {
  const Icon = compact ? LayoutGrid : FileSearch;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-dashed border-border bg-white text-center",
        compact ? "px-6 py-12" : "px-6 py-20",
      )}
    >
      <div className="bg-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
