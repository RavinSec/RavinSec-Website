import Link from "next/link";
import { ArrowUpRight, FileText, Newspaper } from "lucide-react";

import { ContentPostCard } from "@/components/sections/content-post-card";
import { SectionHeader, TitleAccent } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
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

function ContentColumn({ title, icon: Icon, href, posts, emptyMessage }: ContentColumnProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
        </div>
        <Button asChild variant="ghost" size="sm" className="shrink-0 text-muted-foreground">
          <Link href={href} className="gap-1.5">
            مشاهده همه
            <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </Link>
        </Button>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <ContentPostCard key={post.id} post={post} basePath={href} />
          ))}
        </div>
      ) : (
        <GlowCard variant="border" glow={false}>
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </GlowCard>
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
    <section className="section-padding border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge="پایگاه دانش"
          title={
            <>
              آخرین <TitleAccent>اخبار و مقالات</TitleAccent>
            </>
          }
          description="با راهنمایی‌های عملی، توصیه‌های امنیتی و به‌روزرسانی‌های تیم RavinSec به‌روز بمانید."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
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
      </div>
    </section>
  );
}
