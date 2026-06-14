import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  badge?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "lg";
  className?: string;
};

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  size = "default",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {badge ? (
        <Badge variant="glow" className="mb-5">
          {badge}
        </Badge>
      ) : null}
      <h2
        className={cn(
          "heading-display leading-tight",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Wrap one phrase in a section title for accent emphasis. */
export function TitleAccent({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}
