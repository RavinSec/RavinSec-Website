import type { Metadata } from "next";

import { ContentListing } from "@/components/sections/content-listing";
import { PageHero } from "@/components/sections/page-hero";
import { cmsConfigured, getNewsPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "اخبار",
  description: "اخبار شرکت، اعلامیه‌ها و به‌روزرسانی‌های RavinSec.",
  alternates: { canonical: "/news" },
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <>
      <PageHero
        badge="اخبار"
        title="به‌روزرسانی‌ها و اعلامیه‌ها"
        description="بیانیه‌های مطبوعاتی، اخبار شرکت و به‌روزرسانی‌های کوتاه از تیم RavinSec."
      />

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <ContentListing
          posts={posts}
          basePath="/news"
          showFeatured={false}
          emptyMessage={
            cmsConfigured
              ? "هنوز خبری منتشر نشده. محتوا را در Payload منتشر کنید تا اینجا نمایش داده شود."
              : "Payload را متصل کنید (فایل .env.example) تا اخبار از CMS بارگذاری شوند."
          }
        />
      </div>
    </>
  );
}
