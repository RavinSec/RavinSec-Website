import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, siteContact } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-xl font-semibold">
              Ravin<span className="text-primary">Sec</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              خدمات امنیت سایبری برای تیم‌هایی که به وضوح، دقت و نتایج قابل‌اجرا — از تست تا
              مشاوره برنامه امنیتی — نیاز دارند.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              خدمات
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="interactive rounded-sm text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              شرکت
            </p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="interactive rounded-sm text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              تماس
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="interactive inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {siteContact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
                  className="interactive inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {siteContact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RavinSec. تمامی حقوق محفوظ است.</p>
          <p>تمامی ارتباطات محرمانه و تحت NDA.</p>
        </div>
      </div>
    </footer>
  );
}
