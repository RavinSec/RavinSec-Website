import { getPayload } from "payload";
import config from "@payload-config";

import type { BlogPost, NewsPost, PartnerLogo as PartnerLogoDoc, Testimony } from "@/payload-types";
import { type ContentPost, type ContentPostDetail, urlForImage } from "@/lib/content";
import { estimateReadMinutes } from "@/lib/format";
import { extractPlainText, getPostPreviewText } from "@/lib/lexical-text";
import {
  fallbackPartnerLogos,
  fallbackTestimonies,
  type PartnerLogo,
  type Testimonial,
} from "@/lib/testimonials";

export const revalidate = 3600;

const databaseUrl = process.env.DATABASE_URL?.trim();
const payloadSecret = process.env.PAYLOAD_SECRET?.trim();

export const cmsConfigured = Boolean(databaseUrl && payloadSecret);


type ContentCollection = "blog-posts" | "news-posts";
type ContentDocument = BlogPost | NewsPost;

async function getPayloadClient() {
  return getPayload({ config });
}

function mapPost(doc: ContentDocument): ContentPost {
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    publishedAt: doc.publishedAt,
    excerpt: doc.excerpt ?? undefined,
    previewText: getPostPreviewText(doc.excerpt, doc.body),
    category: doc.category ?? undefined,
    author: doc.author ?? undefined,
    coverImage: doc.coverImage,
  };
}

function mapPostDetail(doc: ContentDocument): ContentPostDetail {
  const body = doc.body ?? null;
  const bodyText = extractPlainText(body);
  return {
    ...mapPost(doc),
    body,
    readMinutes: estimateReadMinutes(bodyText || doc.excerpt),
  };
}

/**
 * A few other posts to show under an article: same category first, then the
 * most recent. One cheap query, filtered in memory.
 */
async function fetchRelatedPosts(
  collection: ContentCollection,
  currentSlug: string,
  category: string | undefined,
  limit: number,
): Promise<ContentPost[]> {
  if (!cmsConfigured) return [];

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection,
    limit: 12,
    sort: "-publishedAt",
    depth: 1,
    where: { slug: { not_equals: currentSlug } },
  });

  const posts = result.docs.map(mapPost);
  const sameCategory = category ? posts.filter((post) => post.category === category) : [];
  const rest = posts.filter((post) => !sameCategory.includes(post));
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  category?: string,
  limit = 3,
): Promise<ContentPost[]> {
  return fetchRelatedPosts("blog-posts", currentSlug, category, limit);
}

export async function getRelatedNewsPosts(
  currentSlug: string,
  category?: string,
  limit = 3,
): Promise<ContentPost[]> {
  return fetchRelatedPosts("news-posts", currentSlug, category, limit);
}

async function fetchPostsByCollection(
  collection: ContentCollection,
  limit?: number,
): Promise<ContentPost[]> {
  if (!cmsConfigured) return [];

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection,
    limit: limit ?? 100,
    sort: "-publishedAt",
    depth: 1,
  });

  return result.docs.map(mapPost);
}

export async function getBlogPosts(): Promise<ContentPost[]> {
  return fetchPostsByCollection("blog-posts");
}

export async function getLatestBlogPosts(limit = 3): Promise<ContentPost[]> {
  return fetchPostsByCollection("blog-posts", limit);
}

export async function getBlogPostBySlug(slug: string): Promise<ContentPostDetail | null> {
  if (!cmsConfigured) return null;

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const doc = result.docs[0];
  if (!doc) return null;

  return mapPostDetail(doc);
}

export async function getNewsPosts(): Promise<ContentPost[]> {
  return fetchPostsByCollection("news-posts");
}

export async function getLatestNewsPosts(limit = 3): Promise<ContentPost[]> {
  return fetchPostsByCollection("news-posts", limit);
}

export async function getNewsPostBySlug(slug: string): Promise<ContentPostDetail | null> {
  if (!cmsConfigured) return null;

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "news-posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const doc = result.docs[0];
  if (!doc) return null;

  return mapPostDetail(doc);
}

export async function getBlogSlugs(): Promise<string[]> {
  if (!cmsConfigured) return [];

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blog-posts",
    limit: 1000,
    select: { slug: true },
  });

  return result.docs.map((doc) => doc.slug);
}

export async function getNewsSlugs(): Promise<string[]> {
  if (!cmsConfigured) return [];

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "news-posts",
    limit: 1000,
    select: { slug: true },
  });

  return result.docs.map((doc) => doc.slug);
}


function mapTestimony(doc: Testimony): Testimonial {
  return {
    id: String(doc.id),
    quote: doc.quote,
    author: doc.author,
    role: doc.role,
    industry: doc.industry ?? undefined,
    featured: doc.featured ?? undefined,
  };
}

function mapPartnerLogo(doc: PartnerLogoDoc): PartnerLogo {
  return {
    id: String(doc.id),
    name: doc.name,
    logoUrl: urlForImage(doc.logo),
    url: doc.url ?? undefined,
  };
}

export async function getTestimonies(): Promise<Testimonial[]> {
  if (!cmsConfigured) return fallbackTestimonies;

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "testimonies",
    limit: 100,
    sort: "sortOrder",
    depth: 1,
  });

  const testimonies = result.docs.map(mapTestimony);
  return testimonies.length > 0 ? testimonies : fallbackTestimonies;
}

export async function getPartnerLogos(): Promise<PartnerLogo[]> {
  if (!cmsConfigured) return fallbackPartnerLogos;

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "partner-logos",
    limit: 100,
    sort: "sortOrder",
    depth: 1,
  });

  const partners = result.docs.map(mapPartnerLogo);
  return partners.length > 0 ? partners : fallbackPartnerLogos;
}

export type { ContentPost, ContentPostDetail, PartnerLogo, Testimonial };
export { urlForImage };
