import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { RichText } from "@/components/cms/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getNewsPostBySlug, getNewsSlugs } from "@/lib/cms";
import { formatDate } from "@/lib/format";

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

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Button asChild variant="ghost" size="sm" className="-ms-2 mb-8 text-muted-foreground">
        <Link href="/news">
          <ArrowLeft className="me-1 h-4 w-4 rtl:rotate-180" />
          بازگشت به اخبار
        </Link>
      </Button>

      <header>
        <Badge variant="glow" className="mb-5">
          به‌روزرسانی
        </Badge>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" aria-hidden />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <h1 className="heading-display mt-4 text-4xl sm:text-5xl">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        ) : null}
      </header>

      <Separator className="my-10 bg-border" />

      <RichText data={post.body} />
    </article>
  );
}
