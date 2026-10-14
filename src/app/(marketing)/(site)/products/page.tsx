import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { ProductDetailSections, ProductsJumpBar } from "@/components/products/product-detail";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "محصولات",
  description:
    "افراسی (AfraSI) — سامانه کنترل امن ورود و خروج فایل با کیوسک و مرورگر ایزوله — و تست نفوذ مبتنی بر Machine Learning و LLM؛ محصولات اختصاصی RavinSec.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        badge="محصولات"
        title="فناوری امنیتی ساخته‌شده برای عملیات واقعی"
        description="محصولات RavinSec کنترل امن فایل، دسترسی ایزوله به اینترنت و خودکارسازی تست نفوذ را در قالبی قابل استقرار و پشتیبانی ارائه می‌دهند."
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="-mt-8 relative z-10 sm:-mt-10">
          <ProductsJumpBar />
        </div>

        <ProductDetailSections />
      </div>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden bg-[#06152b] py-20 text-slate-100 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-cyan-200">
              مشاوره و دمو
            </span>
            <h2 className="heading-display mt-5 text-3xl leading-tight text-white sm:text-4xl">
              استقرار را با یک جلسه فنی شروع کنید
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              درباره استقرار افراسی در شبکه سازمان، یکپارچه‌سازی خط لوله ML/LLM یا ترکیب محصولات با
              خدمات مدیریت‌شده RavinSec با تیم ما صحبت کنید.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button asChild size="lg" className="bg-cyan-400 text-slate-950 shadow-none hover:bg-cyan-300">
              <Link href="/contact" className="gap-2">
                درخواست مشاوره
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-slate-100 hover:border-cyan-400/40 hover:bg-white/5 hover:text-white"
            >
              <Link href="/catalogs" className="gap-2">
                <BookOpen className="h-4 w-4" aria-hidden />
                کاتالوگ‌های محصول
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
