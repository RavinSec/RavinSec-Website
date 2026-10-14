import type { Metadata } from "next";
import { CalendarDays, FileText } from "lucide-react";

import { ContentListing } from "@/components/sections/content-listing";
import { PageHero } from "@/components/sections/page-hero";
import { cmsConfigured, getBlogPosts } from "@/lib/cms";
import { formatDate, toPersianDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "وبلاگ",
  description: "دیدگاه‌هایی درباره تست امنیتی، ریسک و دفاع از تیم RavinSec.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const latest = posts[0];
  const emptyMessage = cmsConfigured
    ? "هنوز پستی منتشر نشده. محتوا را در Payload منتشر کنید تا اینجا نمایش داده شود."
    : "Payload را متصل کنید (فایل .env.example) تا پست‌های وبلاگ از CMS بارگذاری شوند.";

  return (
    <>
      <PageHero
        badge="وبلاگ"
        title="دیدگاه‌های میدانی"
        description="دیدگاه‌های میدانی درباره تست امنیتی، ریسک و دفاع از تیم RavinSec."
      >
        {posts.length > 0 ? (
          <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" aria-hidden />
              <dt className="sr-only">تعداد مقالات</dt>
              <dd>
                <span className="font-mono font-semibold text-foreground">{toPersianDigits(posts.length)}</span>{" "}
                مقاله
              </dd>
            </div>
            {latest ? (
              <div className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
                <dt className="sr-only">آخرین انتشار</dt>
                <dd>
                  آخرین انتشار{" "}
                  <time dateTime={latest.publishedAt} className="font-medium text-foreground">
                    {formatDate(latest.publishedAt)}
                  </time>
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </PageHero>

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <ContentListing
          posts={posts}
          basePath="/blog"
          emptyMessage={emptyMessage}
          showFeatured
          gridTitle="آخرین مقالات"
        />
      </div>
    </>
  );
}
