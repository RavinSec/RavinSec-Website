import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostArticle } from "@/components/blog/post-article";
import { getNewsPostBySlug, getNewsSlugs, getRelatedNewsPosts, urlForImage } from "@/lib/cms";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    return { title: "خبر یافت نشد" };
  }

  const description = post.excerpt ?? post.previewText;
  const coverUrl = urlForImage(post.coverImage);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
    twitter: {
      card: coverUrl ? "summary_large_image" : "summary",
      title: post.title,
      description,
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedNewsPosts(post.slug, post.category);

  return <PostArticle post={post} basePath="/news" sectionLabel="اخبار" related={related} />;
}
