import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CatalogCard } from "@/components/catalogs/catalog-card";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { catalogs } from "@/lib/catalogs";

export const metadata: Metadata = {
  title: "کاتالوگ محصولات",
  description:
    "کاتالوگ‌های تعاملی محصولات RavinSec — از جمله AFRASI، سامانه کنترل امن ورود و خروج فایل با کیوسک و مرورگر ایزوله.",
};

export default function CatalogsPage() {
  return (
    <>
      <PageHero
        badge="کاتالوگ‌ها"
        title="کاتالوگ محصولات"
        description="نسخه‌ی تعاملی بروشورهای محصولات RavinSec؛ معماری، ویژگی‌ها و بخش‌های هر محصول را مرور کنید یا نسخه چاپی را دریافت کنید."
      />

      <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {catalogs.map((catalog, index) => (
            <CatalogCard key={catalog.slug} catalog={catalog} index={index} />
          ))}
        </div>

        <GlowCard variant="elevated" glow={false} className="mt-16 p-8 text-center">
          <h2 className="font-display text-xl font-semibold">به اطلاعات فنی بیشتری نیاز دارید؟</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            برای مستندات استقرار، پیش‌نیازهای زیرساخت یا دموی اختصاصی هر محصول با تیم RavinSec صحبت
            کنید.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact" className="gap-2">
              تماس با ما
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Button>
        </GlowCard>
      </div>
    </>
  );
}
