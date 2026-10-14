"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useReducedMotionPreferred } from "@/lib/motion";
import { isNavLinkActive, mainNav } from "@/lib/navigation";
import { useHash } from "@/lib/use-hash";
import { cn } from "@/lib/utils";

const navItemClass =
  "relative z-10 inline-flex h-9 cursor-pointer items-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:px-4 xl:text-sm";

function ActivePill() {
  const reducedMotion = useReducedMotionPreferred();
  return (
    <motion.span
      layoutId="main-nav-active"
      aria-hidden
      className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-border"
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
    />
  );
}

function NavDropdownLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="text-sm font-medium leading-none">{label}</div>
        {description ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Link>
    </NavigationMenuLink>
  );
}

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const hash = useHash();

  return (
    <NavigationMenu dir="rtl" className={cn("hidden lg:flex", className)}>
      <NavigationMenuList className="gap-0.5 rounded-full border border-border/70 bg-muted/60 p-1">
        {mainNav.map((group) => {
          const hasDropdown = group.items || group.columns;
          const active = isNavLinkActive(pathname, hash, group.href);

          if (!hasDropdown && group.href) {
            return (
              <NavigationMenuItem key={group.label} className="relative">
                {active ? <ActivePill /> : null}
                <NavigationMenuLink asChild active={active}>
                  <Link
                    href={group.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      navItemClass,
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {group.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={group.label} className="relative">
              {active ? <ActivePill /> : null}
              <NavigationMenuTrigger
                className={cn(
                  navItemClass,
                  "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {group.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {group.columns ? (
                  <div className="grid w-[480px] gap-3 p-4 md:grid-cols-2">
                    {group.columns.map((col) => (
                      <div key={col.title}>
                        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {col.title}
                        </p>
                        <ul className="space-y-1">
                          {col.items.map((item) => (
                            <li key={item.href}>
                              <NavDropdownLink {...item} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="grid w-[360px] gap-1 p-3">
                    {group.items?.map((item) => (
                      <li key={item.href}>
                        <NavDropdownLink {...item} />
                      </li>
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
