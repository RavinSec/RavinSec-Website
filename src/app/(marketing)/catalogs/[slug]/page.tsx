import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogChapters } from "@/components/catalogs/catalog-chapters";
import { CatalogCompany } from "@/components/catalogs/catalog-company";
import { CatalogCover } from "@/components/catalogs/catalog-cover";
import { CatalogCta } from "@/components/catalogs/catalog-cta";
import { CatalogFeatures } from "@/components/catalogs/catalog-features";
import { CatalogIntro } from "@/components/catalogs/catalog-intro";
import { CatalogSectionNav } from "@/components/catalogs/catalog-section-nav";
import { CatalogSpotlight } from "@/components/catalogs/catalog-spotlight";
import { getCatalogBySlug, getCatalogSlugs } from "@/lib/catalogs";

type CatalogPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCatalogBySlug(slug);
  if (!catalog) return {};

  const title = `کاتالوگ ${catalog.persianName} (${catalog.name})`;

  return {
    title,
    description: catalog.summary,
    openGraph: {
      title: `${title} | RavinSec`,
      description: catalog.summary,
      images: catalog.brochure
        ? [{ url: catalog.brochure.previewUrl, width: catalog.brochure.width, height: catalog.brochure.height }]
        : undefined,
    },
  };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { slug } = await params;
  const catalog = getCatalogBySlug(slug);
  if (!catalog) notFound();

  return (
    <>
      <CatalogCover catalog={catalog} />
      <CatalogSectionNav catalogName={catalog.name} />
      <CatalogIntro catalog={catalog} />
      <CatalogSpotlight spotlights={catalog.spotlights} />
      <CatalogFeatures features={catalog.features} />
      <CatalogChapters chapters={catalog.chapters} />
      <CatalogCompany company={catalog.company} />
      <CatalogCta catalog={catalog} />
    </>
  );
}
