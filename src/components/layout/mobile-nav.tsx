"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { isNavLinkActive, mainNav } from "@/lib/navigation";
import { useHash } from "@/lib/use-hash";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  onNavigate?: () => void;
};

export function MobileNav({ onNavigate }: MobileNavProps) {
  const pathname = usePathname();
  const hash = useHash();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (label: string) => {
    setExpanded((current) => (current === label ? null : label));
  };

  return (
    <nav className="flex flex-col gap-1 p-4" dir="rtl" aria-label="منوی موبایل">
      {mainNav.map((group) => {
        const links = group.items ?? group.columns?.flatMap((c) => c.items) ?? [];
        const hasChildren = links.length > 0;

        if (!hasChildren && group.href) {
          return (
            <Link
              key={group.label}
              href={group.href}
              onClick={onNavigate}
              className={cn(
                "interactive rounded-lg px-4 py-3 text-sm font-medium focus-visible:rounded-lg",
                isNavLinkActive(pathname, hash, group.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary",
              )}
            >
              {group.label}
            </Link>
          );
        }

        return (
          <div key={group.label} className="rounded-lg border border-border/50">
            <button
              type="button"
              onClick={() => toggle(group.label)}
              className="interactive flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium focus-visible:rounded-lg"
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
              <div className="space-y-1 border-t border-border/50 px-2 py-2">
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
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className="interactive block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))
                  : group.items?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className="interactive block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
              </div>
            ) : null}
          </div>
        );
      })}
      <Button asChild className="mt-2 w-full">
        <Link href="/contact" onClick={onNavigate}>
          تماس
        </Link>
      </Button>
    </nav>
  );
}
