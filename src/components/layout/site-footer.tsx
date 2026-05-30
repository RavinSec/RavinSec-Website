import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, siteContact } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold">
              Ravin<span className="text-primary">Sec</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              خدمات امنیت سایبری برای تیم‌هایی که به وضوح، دقت و نتایج قابل‌اجرا — از تست تا
              مشاوره برنامه امنیتی — نیاز دارند.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">خدمات</p>
            <ul className="mt-4 space-y-3">
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
            <p className="text-sm font-medium text-foreground">شرکت</p>
            <ul className="mt-4 space-y-3">
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
            <p className="text-sm font-medium text-foreground">تماس</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="interactive inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {siteContact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
                  className="interactive inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  {siteContact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border/60" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RavinSec. تمامی حقوق محفوظ است.</p>
          <p>تمامی ارتباطات محرمانه و تحت NDA.</p>
        </div>
      </div>
    </footer>
  );
}
