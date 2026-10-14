import Link from "next/link";
import { ArrowUpRight, FileText, Newspaper } from "lucide-react";

import { ContentPostCard } from "@/components/sections/content-post-card";
import { SectionHeader } from "@/components/sections/section-header";
import { cmsConfigured } from "@/lib/cms";
import type { ContentBasePath, ContentPost } from "@/lib/content";

type LatestContentSectionProps = {
  articles: ContentPost[];
  news: ContentPost[];
};

type ContentColumnProps = {
  title: string;
  icon: typeof FileText;
  href: ContentBasePath;
  posts: ContentPost[];
  emptyMessage: string;
};

function ContentColumn({ title, icon: Icon, href, posts, emptyMessage }: ContentColumnProps) {
  const [lead, ...rest] = posts;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-muted/30 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
        </div>

        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          مشاهده همه
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      {lead ? (
        <div className="flex flex-1 flex-col gap-2">
          <ContentPostCard post={lead} basePath={href} />
          {rest.length > 0 ? (
            <ul className="mt-2 divide-y divide-border/70">
              {rest.map((post) => (
                <li key={post.id} className="py-1">
                  <ContentPostCard post={post} basePath={href} variant="compact" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-border bg-white p-8 text-center">
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export function LatestContentSection({ articles, news }: LatestContentSectionProps) {
  const articlesEmptyMessage = cmsConfigured
    ? "هنوز مقاله‌ای منتشر نشده. پست‌های وبلاگ را در Payload منتشر کنید تا اینجا نمایش داده شوند."
    : "Payload را متصل کنید (فایل .env.example) تا مقالات از CMS بارگذاری شوند.";

  const newsEmptyMessage = cmsConfigured
    ? "هنوز خبری منتشر نشده. به‌روزرسانی‌ها را در Payload منتشر کنید تا اینجا نمایش داده شوند."
    : "Payload را متصل کنید (فایل .env.example) تا اخبار از CMS بارگذاری شوند.";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeader
        badge="پایگاه دانش"
        title={<>آخرین اخبار و مقالات</>}
        description="با راهنمایی‌های عملی، توصیه‌های امنیتی و به‌روزرسانی‌های تیم RavinSec به‌روز بمانید."
        align="center"
        className="mx-auto"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ContentColumn
          title="مقالات"
          icon={FileText}
          href="/blog"
          posts={articles}
          emptyMessage={articlesEmptyMessage}
        />

        <ContentColumn
          title="اخبار"
          icon={Newspaper}
          href="/news"
          posts={news}
          emptyMessage={newsEmptyMessage}
        />
      </div>
    </section>
  );
}
