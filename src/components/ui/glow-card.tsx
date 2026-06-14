import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const glowCardVariants = cva(
  "group relative rounded-2xl transition-[border-color,box-shadow,background-color,transform] duration-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-white p-6 shadow-soft hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-elevated",
        border:
          "border border-border bg-white p-6 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-muted/40 hover:shadow-soft",
        elevated:
          "border border-border bg-white p-6 shadow-elevated hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-elevated",
        feature:
          "flex flex-row items-start gap-4 border border-border bg-white p-5 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-muted/40 hover:shadow-soft",
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
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

export { glowCardVariants };
