import { getPayload } from "payload";
import config from "@payload-config";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

import type { BlogPost, Media, NewsPost, PartnerLogo as PartnerLogoDoc, Testimony } from "@/payload-types";
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

export type ContentPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  category?: string;
  author?: string;
  coverImage?: Media | number | string | null;
};

export type ContentPostDetail = ContentPost & {
  body?: DefaultTypedEditorState | null;
};

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
    category: doc.category ?? undefined,
    author: doc.author ?? undefined,
    coverImage: doc.coverImage,
  };
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

  return {
    ...mapPost(doc),
    body: doc.body ?? null,
  };
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

  return {
    ...mapPost(doc),
    body: doc.body ?? null,
  };
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

export function urlForImage(source: Media | number | string | null | undefined): string | null {
  if (!source || typeof source === "number" || typeof source === "string") return null;
  return source.url ?? null;
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

export type { PartnerLogo, Testimonial };
