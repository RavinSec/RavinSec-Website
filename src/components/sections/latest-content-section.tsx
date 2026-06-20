import Link from "next/link";
import { FileText, Newspaper } from "lucide-react";

import { ContentPostCard } from "@/components/sections/content-post-card";
import { SectionHeader } from "@/components/sections/section-header";
import { GlowCard } from "@/components/ui/glow-card";
import { cmsConfigured, type ContentPost } from "@/lib/cms";

type LatestContentSectionProps = {
  articles: ContentPost[];
  news: ContentPost[];
};

type ContentColumnProps = {
  title: string;
  icon: typeof FileText;
  href: "/blog" | "/news";
  posts: ContentPost[];
  emptyMessage: string;
};

function ContentColumn({
  title,
  icon: Icon,
  href,
  posts,
  emptyMessage,
}: ContentColumnProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>

          <h3 className="font-display text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>

        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          مشاهده همه
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="flex-1">
        {posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <ContentPostCard key={post.id} post={post} basePath={href} />
            ))}
          </div>
        ) : (
          <GlowCard variant="border" glow={false} className="p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {emptyMessage}
            </p>
          </GlowCard>
        )}
      </div>
    </div>
  );
}

export function LatestContentSection({
  articles,
  news,
}: LatestContentSectionProps) {
  const articlesEmptyMessage = cmsConfigured
    ? "هنوز مقاله‌ای منتشر نشده. پست‌های وبلاگ را در Payload منتشر کنید تا اینجا نمایش داده شوند."
    : "Payload را متصل کنید (فایل .env.example) تا مقالات از CMS بارگذاری شوند.";

  const newsEmptyMessage = cmsConfigured
    ? "هنوز خبری منتشر نشده. به‌روزرسانی‌ها را در Payload منتشر کنید تا اینجا نمایش داده شوند."
    : "Payload را متصل کنید (فایل .env.example) تا اخبار از CMS بارگذاری شوند.";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeader
        badge="پایگاه دانش"
        title={<>آخرین اخبار و مقالات</>}
        description="با راهنمایی‌های عملی، توصیه‌های امنیتی و به‌روزرسانی‌های تیم RavinSec به‌روز بمانید."
        align="center"
        className="mx-auto"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
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