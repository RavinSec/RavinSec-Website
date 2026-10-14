import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero";
import { LatestContentSection } from "@/components/sections/latest-content-section";
import { ManagedServicesHighlightSection } from "@/components/sections/managed-services-highlight";
import { PartnersStripSection } from "@/components/sections/partners-strip";
import { ProcessSection } from "@/components/sections/process-section";
import { ProductsShowcaseSection } from "@/components/sections/products-showcase";
import { TestimoniesSection } from "@/components/sections/testimonies-section";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { getLatestBlogPosts, getLatestNewsPosts, getPartnerLogos, getTestimonies } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [articles, news, testimonies, partners] = await Promise.all([
    getLatestBlogPosts(3),
    getLatestNewsPosts(3),
    getTestimonies(),
    getPartnerLogos(),
  ]);

  return (
    <>
      <HeroSection />
      <PartnersStripSection partners={partners} />
      <ManagedServicesHighlightSection />
      <ProcessSection />
      <ProductsShowcaseSection />
      <LatestContentSection articles={articles} news={news} />
      <TestimoniesSection testimonies={testimonies} />
      <AboutUsSection />
      <CtaSection />
    </>
  );
}
