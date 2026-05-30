import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const glowCardVariants = cva(
  "group relative rounded-xl backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-200",
  {
    variants: {
      variant: {
        default:
          "border border-border/60 bg-card/40 p-6 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_hsl(var(--primary)/0.35)]",
        border:
          "border border-border/60 bg-transparent p-6 hover:border-primary/40 hover:bg-card/20",
        elevated: "border border-border/60 bg-card/60 p-6 shadow-md hover:border-primary/30",
        feature:
          "flex flex-row items-start gap-4 border border-border/60 bg-transparent p-5 hover:border-primary/40 hover:bg-card/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type GlowCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof glowCardVariants> & {
    glow?: boolean;
  };

export function GlowCard({
  className,
  variant,
  glow = true,
  children,
  ...props
}: GlowCardProps) {
  const showGlowGradient = glow && (variant === "default" || variant === undefined);

  return (
    <div className={cn(glowCardVariants({ variant }), className)} {...props}>
      {showGlowGradient ? (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

export { glowCardVariants };
