import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { RichText } from "@/components/cms/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/cms";
import { formatDate } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "مطلب یافت نشد" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Button asChild variant="ghost" size="sm" className="-ms-2 mb-8 text-muted-foreground">
        <Link href="/blog">
          <ArrowLeft className="me-1 h-4 w-4 rtl:rotate-180" />
          بازگشت به وبلاگ
        </Link>
      </Button>

      <Badge variant="glow" className="mb-4">
        مقاله
      </Badge>
      <p className="font-mono text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">{post.title}</h1>
      {post.excerpt ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
      ) : null}

      <Separator className="my-10 bg-border/60" />

      <div className="prose prose-invert prose-headings:font-display prose-a:text-primary max-w-none">
        <RichText data={post.body} />
      </div>
    </article>
  );
}
