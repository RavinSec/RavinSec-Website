import type { Metadata } from "next";

import { ContentListing } from "@/components/sections/content-listing";
import { PageHero } from "@/components/sections/page-hero";
import { cmsConfigured, getBlogPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "وبلاگ",
  description: "دیدگاه‌هایی درباره تست امنیتی، ریسک و دفاع از تیم RavinSec.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const emptyMessage = cmsConfigured
    ? "هنوز پستی منتشر نشده. محتوا را در Payload منتشر کنید تا اینجا نمایش داده شود."
    : "Payload را متصل کنید (فайل .env.example) تا پست‌های وبلاگ از CMS بارگذاری شوند.";

  return (
    <>
      <PageHero
        badge="وبلاگ"
        title="دیدگاه‌های میدانی"
        description="مقالات بلند درباره شیوه‌های امنیتی، ابزارها و درس‌های پروژه‌های واقعی."
      />

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <ContentListing
          posts={posts}
          basePath="/blog"
          emptyMessage={emptyMessage}
          showFeatured
        />
      </div>
    </>
  );
}
