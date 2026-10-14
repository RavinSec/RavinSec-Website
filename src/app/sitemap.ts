import type { MetadataRoute } from "next";

import { getCatalogSlugs } from "@/lib/catalogs";
import { getBlogSlugs, getNewsSlugs } from "@/lib/cms";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const staticRoutes = [
  "",
  "/services",
  "/products",
  "/catalogs",
  "/about",
  "/blog",
  "/news",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, newsSlugs] = await Promise.all([getBlogSlugs(), getNewsSlugs()]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${siteUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const catalogEntries: MetadataRoute.Sitemap = getCatalogSlugs().map((slug) => ({
    url: `${siteUrl}/catalogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...catalogEntries, ...blogEntries, ...newsEntries];
}
