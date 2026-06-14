"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { useReducedMotionPreferred } from "@/lib/motion";
import { siteContact } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotionPreferred();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden border-b border-border bg-muted/40 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-start gap-6 px-4 py-1.5 text-xs text-muted-foreground sm:px-6">
          <a
            href={`mailto:${siteContact.email}`}
            className="interactive inline-flex items-center gap-1.5 rounded-sm hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {siteContact.email}
          </a>
          <a
            href={`tel:${siteContact.phone.replace(/\D/g, "")}`}
            className="interactive inline-flex items-center gap-1.5 rounded-sm hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {siteContact.phone}
          </a>
        </div>
      </div>

      <div className="sticky top-0 z-50 px-4 pt-4">
        <header
          dir="rtl"
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-200 sm:px-6",
            scrolled
              ? "border-primary/10 bg-white/95 shadow-elevated"
              : "border-border bg-white/90 shadow-soft",
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <Link
              href="/"
              className="interactive shrink-0 rounded-sm font-display text-lg font-semibold tracking-tight hover:opacity-90"
            >
              Ravin<span className="text-primary">Sec</span>
            </Link>

            <MainNav className="min-w-0 flex-1 justify-start" />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <Link href="/contact">تماس</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={reducedMotion ? undefined : { opacity: 1, height: "auto" }}
              exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-border bg-white/95 shadow-elevated backdrop-blur-xl lg:hidden"
            >
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
