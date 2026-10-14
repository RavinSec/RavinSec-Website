"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { motionEase, useReducedMotionPreferred } from "@/lib/motion";
import { isNavLinkActive, mainNav, siteContact } from "@/lib/navigation";
import { useHash } from "@/lib/use-hash";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  onNavigate?: () => void;
};

const itemClass =
  "interactive flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium focus-visible:rounded-xl";

export function MobileNav({ onNavigate }: MobileNavProps) {
  const pathname = usePathname();
  const hash = useHash();
  const reducedMotion = useReducedMotionPreferred();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) => {
    setExpanded((current) => (current === label ? null : label));
  };

  const list = {
    hidden: {},
    show: { transition: reducedMotion ? { duration: 0 } : { staggerChildren: 0.04, delayChildren: 0.05 } },
  };
  const item = reducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: -6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: motionEase } },
      };

  return (
    <motion.nav
      className="flex flex-col gap-1 p-3"
      dir="rtl"
      aria-label="منوی موبایل"
      variants={list}
      initial="hidden"
      animate="show"
    >
      {mainNav.map((group) => {
        const links = group.items ?? group.columns?.flatMap((c) => c.items) ?? [];
        const hasChildren = links.length > 0;
        const active = isNavLinkActive(pathname, hash, group.href);

        if (!hasChildren && group.href) {
          return (
            <motion.div key={group.label} variants={item}>
              <Link
                href={group.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  itemClass,
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                )}
              >
                {group.label}
                {active ? <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden /> : null}
              </Link>
            </motion.div>
          );
        }

        return (
          <motion.div key={group.label} variants={item} className="rounded-xl border border-border/60">
            <button
              type="button"
              onClick={() => toggle(group.label)}
              aria-expanded={expanded === group.label}
              className={cn(itemClass, "w-full cursor-pointer text-foreground/80")}
            >
              {group.label}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none",
                  expanded === group.label && "rotate-180",
                )}
              />
            </button>
            {expanded === group.label ? (
              <div className="space-y-1 border-t border-border/60 px-2 py-2">
                {group.href ? (
                  <Link
                    href={group.href}
                    onClick={onNavigate}
                    className="interactive block rounded-md px-3 py-2 text-sm text-primary"
                  >
                    نمای کلی
                  </Link>
                ) : null}
                {group.columns
                  ? group.columns.map((col) => (
                      <div key={col.title} className="px-1 py-1">
                        <p className="px-2 py-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                          {col.title}
                        </p>
                        {col.items.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={onNavigate}
                            className="interactive block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))
                  : group.items?.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onNavigate}
                        className="interactive block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ))}
              </div>
            ) : null}
          </motion.div>
        );
      })}

      <motion.div variants={item} className="mt-2 border-t border-border/60 pt-3">
        <Button asChild className="h-11 w-full rounded-xl">
          <Link href="/contact" onClick={onNavigate} className="gap-1.5">
            درخواست مشاوره
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Button>
        <div className="mt-3 flex items-center justify-between gap-3 px-1 text-xs text-muted-foreground">
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
        </div>
      </motion.div>
    </motion.nav>
  );
}
