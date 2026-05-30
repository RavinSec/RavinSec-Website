"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

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
        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

  const isActive = (href?: string) => {
    if (!href || href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <NavigationMenu className={cn("hidden lg:flex", className)}>
      <NavigationMenuList className="gap-0.5">
        {mainNav.map((group) => {
          const hasDropdown = group.items || group.columns;

          if (!hasDropdown && group.href) {
            return (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={group.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive(group.href) && "bg-accent/50 text-foreground",
                    )}
                  >
                    {group.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={group.label}>
              <NavigationMenuTrigger
                className={cn(
                  isActive(group.href) && "bg-accent/50 text-foreground",
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
