import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, ChevronLeft, Clock, ShieldCheck } from "lucide-react";

import { PostShare } from "@/components/blog/post-share";
import { PostToc } from "@/components/blog/post-toc";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RichText } from "@/components/cms/rich-text";
import { CategoryChip, ContentPostCard } from "@/components/sections/content-post-card";
import { Button } from "@/components/ui/button";
import type { ContentBasePath, ContentPost, ContentPostDetail } from "@/lib/content";
import { urlForImage } from "@/lib/content";
import { formatDate, formatReadTime } from "@/lib/format";
import { extractHeadings } from "@/lib/lexical-text";

type PostArticleProps = {
  post: ContentPostDetail;
  basePath: ContentBasePath;
  /** Section name used in the breadcrumb and back link, e.g. "وبلاگ". */
  sectionLabel: string;
  related: ContentPost[];
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function PostArticle({ post, basePath, sectionLabel, related }: PostArticleProps) {
  const coverUrl = urlForImage(post.coverImage);
  const author = post.author ?? "تیم RavinSec";
  const headings = extractHeadings(post.body);
  const url = `${siteUrl}${basePath}/${post.slug}`;
  const isBlog = basePath === "/blog";

  return (
    <>
      <ReadingProgress />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden border-b border-border bg-background">
          <div className="bg-mesh pointer-events-none absolute inset-0" aria-hidden />
          <div className="grid-bg absolute inset-0" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 lg:pt-36">
            <nav aria-label="مسیر صفحه" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                خانه
              </Link>
              <ChevronLeft className="h-3 w-3" aria-hidden />
              <Link href={basePath} className="transition-colors hover:text-foreground">
                {sectionLabel}
              </Link>
              <ChevronLeft className="h-3 w-3" aria-hidden />
              <span className="truncate text-foreground/80" aria-current="page">
                {post.title}
              </span>
            </nav>

            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <CategoryChip post={post} basePath={basePath} />
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {formatReadTime(post.readMinutes)}
                </span>
              </div>

              <h1 className="heading-display mt-5 text-3xl leading-[1.25] sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground shadow-glow-primary">
                  {author.trim().charAt(0)}
                </span>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">{author}</div>
                  <div className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </div>
                </div>
              </div>
              <PostShare title={post.title} url={url} />
            </div>
          </div>
        </header>

        {/* Cover */}
        {coverUrl ? (
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative -mt-px aspect-[21/9] overflow-hidden rounded-b-3xl border-x border-b border-border bg-muted/30 shadow-elevated sm:aspect-[2.6/1]">
              <Image
                src={coverUrl}
                alt=""
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* Body */}
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              {headings.length > 0 ? (
                <details className="mb-8 rounded-2xl border border-border bg-muted/40 p-4 lg:hidden">
                  <summary className="cursor-pointer text-sm font-semibold">فهرست مطالب</summary>
                  <PostToc headings={headings} className="mt-4" />
                </details>
              ) : null}

              <RichText data={post.body} className="prose-content prose-lg prose-headings:scroll-mt-28" />

              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
                <Button asChild variant="outline">
                  <Link href={basePath} className="gap-2">
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
                    بازگشت به {sectionLabel}
                  </Link>
                </Button>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>اشتراک‌گذاری</span>
                  <PostShare title={post.title} url={url} />
                </div>
              </div>
            </div>

            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-24 space-y-6">
                {headings.length > 0 ? (
                  <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                    <PostToc headings={headings} />
                  </div>
                ) : null}

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#06152b] p-5 text-slate-100">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.18),transparent_60%)]" />
                  <div className="relative">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                      <ShieldCheck className="h-4 w-4" aria-hidden />
                    </span>
                    <h2 className="mt-4 font-display text-base font-semibold">
                      {isBlog ? "به ارزیابی امنیتی نیاز دارید؟" : "درباره RavinSec بیشتر بدانید"}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {isBlog
                        ? "تیم RavinSec تست نفوذ، ارزیابی و خدمات مدیریت‌شده را متناسب با ریسک سازمان شما ارائه می‌دهد."
                        : "خدمات، محصولات و کاتالوگ‌های ما را ببینید یا برای مشاوره با تیم ما صحبت کنید."}
                    </p>
                    <Button asChild size="sm" className="mt-4 bg-cyan-400 text-slate-950 shadow-none hover:bg-cyan-300">
                      <Link href="/contact" className="gap-1.5">
                        درخواست مشاوره
                        <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-border bg-muted/30 py-16 lg:py-20" aria-labelledby="related-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">{sectionLabel}</span>
                <h2 id="related-heading" className="heading-display mt-4 text-2xl sm:text-3xl">
                  مطالب مرتبط
                </h2>
              </div>
              <Link
                href={basePath}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                مشاهده همه
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="h-full">
                  <ContentPostCard post={item} basePath={basePath} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
