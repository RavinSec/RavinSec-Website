import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Megaphone,
  Newspaper,
  ShieldAlert,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { getCategoryLabel, getCategoryStyle } from "@/lib/content-categories";
import { type ContentPost, urlForImage } from "@/lib/content";
import { estimateReadMinutes, formatDate, formatReadTime } from "@/lib/format";
import { cn } from "@/lib/utils";

type BasePath = "/blog" | "/news";

type ContentPostCardProps = {
  post: ContentPost;
  basePath: BasePath;
  /** `featured` = editorial hero card, `compact` = horizontal row with thumbnail. */
  variant?: "default" | "featured" | "compact";
  /** Mark the cover image as high priority (above-the-fold). */
  priority?: boolean;
  className?: string;
};

const categoryIcons: Record<string, LucideIcon> = {
  "threat-analysis": ShieldAlert,
  remediation: Wrench,
  guide: BookOpen,
  announcement: Megaphone,
  update: Newspaper,
};

export function CategoryChip({
  post,
  basePath,
  tone = "light",
  className,
}: {
  post: ContentPost;
  basePath: BasePath;
  tone?: "light" | "dark";
  className?: string;
}) {
  const label =
    getCategoryLabel(post.category) ?? (basePath === "/blog" ? "مقاله" : "به‌روزرسانی");
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md border px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wide",
        tone === "dark"
          ? "border-white/15 bg-white/10 text-white backdrop-blur"
          : getCategoryStyle(post.category),
        className,
      )}
    >
      {label}
    </span>
  );
}

function PostMeta({
  post,
  readMinutes,
  className,
  size = "sm",
}: {
  post: ContentPost;
  readMinutes: number;
  className?: string;
  size?: "xs" | "sm";
}) {
  const author = post.author ?? "تیم RavinSec";
  const iconClass = size === "xs" ? "h-3 w-3" : "h-3.5 w-3.5";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground",
        size === "xs" ? "text-[0.7rem]" : "text-xs",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 font-display text-[0.6rem] font-bold text-primary">
          {author.trim().charAt(0)}
        </span>
        {author}
      </span>
      <span className="inline-flex items-center gap-1">
        <Calendar className={iconClass} aria-hidden />
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </span>
      <span className="inline-flex items-center gap-1 font-mono">
        <Clock className={iconClass} aria-hidden />
        {formatReadTime(readMinutes)}
      </span>
    </div>
  );
}

/** Cover image, or a branded placeholder when the post has none. */
export function PostCover({
  post,
  priority,
  sizes,
  className,
  iconClassName,
  showBrand = true,
}: {
  post: ContentPost;
  priority?: boolean;
  sizes: string;
  className?: string;
  iconClassName?: string;
  /** Hide the small wordmark on tiny thumbnails. */
  showBrand?: boolean;
}) {
  const coverUrl = urlForImage(post.coverImage);

  if (coverUrl) {
    return (
      <div className={cn("relative overflow-hidden bg-muted/30", className)}>
        <Image
          src={coverUrl}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    );
  }

  const Icon = categoryIcons[post.category ?? ""] ?? BookOpen;

  return (
    <div
      className={cn("relative overflow-hidden bg-[#071530] text-cyan-200", className)}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgba(59,130,246,0.25),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "flex items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none",
            iconClassName ?? "h-14 w-14",
          )}
        >
          <Icon className="h-1/2 w-1/2" />
        </span>
      </div>
      {showBrand ? (
        <span className="absolute bottom-3 start-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-400">
          RavinSec
        </span>
      ) : null}
    </div>
  );
}

export function ContentPostCard({
  post,
  basePath,
  variant = "default",
  priority,
  className,
}: ContentPostCardProps) {
  const href = `${basePath}/${post.slug}`;
  const previewText = post.previewText ?? post.excerpt;
  const readMinutes = estimateReadMinutes(previewText);

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative isolate block overflow-hidden rounded-3xl border border-border bg-white shadow-elevated outline-none transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          className,
        )}
      >
        <div className="grid lg:grid-cols-12">
          <PostCover
            post={post}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="aspect-[16/9] lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]"
            iconClassName="h-20 w-20"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div className="flex items-center gap-2">
              <CategoryChip post={post} basePath={basePath} />
              <span className="eyebrow border-transparent bg-transparent px-0 text-muted-foreground">
                مطلب برگزیده
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
              {post.title}
            </h3>
            {previewText ? (
              <p className="mt-4 line-clamp-4 text-base leading-relaxed text-muted-foreground">
                {previewText}
              </p>
            ) : null}
            <PostMeta post={post} readMinutes={readMinutes} className="mt-6" />
            <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              ادامه مطلب
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-start gap-4 rounded-2xl border border-transparent p-3 outline-none transition-colors hover:border-border hover:bg-white focus-visible:ring-2 focus-visible:ring-primary/40",
          className,
        )}
      >
        <PostCover
          post={post}
          sizes="112px"
          className="h-20 w-28 shrink-0 rounded-xl border border-border/60"
          iconClassName="h-9 w-9"
          showBrand={false}
        />
        <div className="min-w-0 flex-1">
          <CategoryChip post={post} basePath={basePath} />
          <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-[0.7rem] text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="font-mono">{formatReadTime(readMinutes)}</span>
          </div>
        </div>
        <ArrowUpRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary rtl:-scale-x-100"
          aria-hidden
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white outline-none transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <PostCover
        post={post}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="aspect-[16/9] border-b border-border/60"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <CategoryChip post={post} basePath={basePath} />
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
        </div>
        <h3 className="mt-4 line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-xl">
          {post.title}
        </h3>
        {previewText ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {previewText}
          </p>
        ) : null}
        <PostMeta post={post} readMinutes={readMinutes} size="xs" className="mt-auto pt-5" />
      </div>
    </Link>
  );
}
