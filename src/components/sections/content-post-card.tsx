import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { getCategoryLabel, getCategoryStyle } from "@/lib/content-categories";
import { type ContentPost, urlForImage } from "@/lib/cms";
import { estimateReadMinutes, formatDate, formatReadTime } from "@/lib/format";
import { cn } from "@/lib/utils";

type ContentPostCardProps = {
  post: ContentPost;
  basePath: "/blog" | "/news";
  featured?: boolean;
};

function CategoryBadge({ post, basePath }: { post: ContentPost; basePath: "/blog" | "/news" }) {
  const categoryLabel = getCategoryLabel(post.category);
  if (categoryLabel) {
    return (
      <span
        className={cn(
          "inline-flex w-fit self-start rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide",
          getCategoryStyle(post.category),
        )}
      >
        {categoryLabel}
      </span>
    );
  }
  return (
    <Badge variant="outline" className="w-fit shrink-0 self-start font-mono text-[0.65rem] uppercase">
      {basePath === "/blog" ? "مقاله" : "به‌روزرسانی"}
    </Badge>
  );
}

function PostCover({
  post,
  coverUrl,
  featured,
}: {
  post: ContentPost;
  coverUrl: string | null;
  featured?: boolean;
}) {
  if (coverUrl) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border-border/60 bg-muted/30",
          featured
            ? "aspect-[16/9] w-full border-b lg:aspect-auto lg:min-h-[240px] lg:w-2/5 lg:border-b-0 lg:border-s"
            : "aspect-[16/9] w-full border-b",
        )}
      >
        <Image
          src={coverUrl}
          alt={post.title}
          fill
          className="object-cover transition-opacity duration-200 group-hover:opacity-90"
          sizes={featured ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 768px) 100vw, 33vw"}
          priority={featured}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border-border bg-gradient-to-br from-primary/8 via-white to-primary/5",
        featured
          ? "aspect-[16/9] w-full border-b lg:aspect-auto lg:min-h-[240px] lg:w-2/5 lg:border-b-0 lg:border-s"
          : "aspect-[16/9] w-full border-b",
      )}
      aria-hidden
    />
  );
}

export function ContentPostCard({ post, basePath, featured = false }: ContentPostCardProps) {
  const coverUrl = urlForImage(post.coverImage);
  const previewText = post.previewText ?? post.excerpt;
  const readMinutes = estimateReadMinutes(previewText);
  const author = post.author ?? "تیم RavinSec";

  if (featured) {
    return (
      <Link
        href={`${basePath}/${post.slug}`}
        className="interactive group block rounded-2xl focus-visible:rounded-2xl"
      >
        <GlowCard
          variant="elevated"
          glow={false}
          className="flex h-full flex-col overflow-hidden p-0 lg:flex-row"
        >
          <PostCover post={post} coverUrl={coverUrl} featured />
          <div className="flex min-w-0 flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
            <CategoryBadge post={post} basePath={basePath} />
            <h3 className="mt-4 font-display text-2xl font-semibold leading-snug group-hover:text-primary sm:text-3xl">
              {post.title}
            </h3>
            {previewText ? (
              <p className="mt-3 line-clamp-4 text-base leading-relaxed text-muted-foreground">
                {previewText}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" aria-hidden />
                {author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {formatReadTime(readMinutes)}
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              ادامه مطلب
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </span>
          </div>
        </GlowCard>
      </Link>
    );
  }

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="interactive group block rounded-2xl focus-visible:rounded-2xl"
    >
      <GlowCard
        variant="border"
        glow={false}
        className="flex h-full flex-col overflow-hidden p-0"
      >
        <PostCover post={post} coverUrl={coverUrl} />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <CategoryBadge post={post} basePath={basePath} />
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary rtl:-scale-x-100" />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold leading-snug group-hover:text-primary">
            {post.title}
          </h3>
          {previewText ? (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {previewText}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="h-3 w-3" aria-hidden />
              {author}
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden />
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-border">·</span>
            <span className="font-mono">{formatReadTime(readMinutes)}</span>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}
