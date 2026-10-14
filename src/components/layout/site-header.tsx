"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { useReducedMotionPreferred } from "@/lib/motion";
import { siteContact } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="RavinSec — صفحه اصلی"
      className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-[hsl(217,91%,52%)] to-sky-500 text-white shadow-glow-primary transition-transform duration-200 group-hover:-translate-y-px motion-reduce:transition-none">
        <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-white/15" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Ravin<span className="text-primary">Sec</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotionPreferred();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on route change and lock body scroll while open.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="hidden border-b border-border bg-muted/40 lg:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-1.5 text-xs text-muted-foreground sm:px-6">
          <a
            href={`mailto:${siteContact.email}`}
            className="interactive inline-flex items-center gap-1.5 rounded-sm hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            <span dir="ltr">{siteContact.email}</span>
          </a>
          <a
            href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
            className="interactive inline-flex items-center gap-1.5 rounded-sm hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            <span dir="ltr">{siteContact.phone}</span>
          </a>
          <span className="ms-auto hidden items-center gap-1.5 xl:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            پاسخ‌گویی در روزهای کاری، ۹ تا ۱۸
          </span>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 z-50 px-3 transition-[top] duration-300 ease-out motion-reduce:transition-none sm:px-4",
          scrolled ? "top-3" : "top-3 lg:top-12",
        )}
      >
        <header
          dir="rtl"
          className={cn(
            "relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-300 motion-reduce:transition-none sm:px-4",
            scrolled || mobileOpen
              ? "border-primary/10 bg-white/95 shadow-elevated"
              : "border-border/80 bg-white/85 shadow-soft",
          )}
        >
          <Logo />

          <MainNav className="absolute inset-x-0 mx-auto justify-center" />

          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="sm" className="hidden h-9 rounded-full px-4 lg:inline-flex">
              <Link href="/contact" className="group gap-1.5">
                درخواست مشاوره
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 motion-reduce:transition-none" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={reducedMotion ? false : { opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </header>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav"
              initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-6xl overflow-y-auto rounded-2xl border border-border bg-white/95 shadow-elevated backdrop-blur-xl lg:hidden"
            >
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.button
            type="button"
            aria-label="بستن منو"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
