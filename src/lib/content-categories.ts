export type ContentCategory =
  | "threat-analysis"
  | "remediation"
  | "guide"
  | "announcement"
  | "update";

export const categoryLabels: Record<ContentCategory, string> = {
  "threat-analysis": "تحلیل تهدید",
  remediation: "راهنمای رفع",
  guide: "راهنما",
  announcement: "اعلامیه",
  update: "به‌روزرسانی",
};

export const categoryStyles: Record<ContentCategory, string> = {
  "threat-analysis": "border-primary/30 bg-primary/10 text-primary",
  remediation: "border-accent/30 bg-accent/10 text-accent",
  guide: "border-border/80 bg-secondary/50 text-muted-foreground",
  announcement: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  update: "border-border/80 bg-secondary/50 text-muted-foreground",
};

export function getCategoryLabel(category?: string | null): string | null {
  if (!category) return null;
  return categoryLabels[category as ContentCategory] ?? category;
}

export function getCategoryStyle(category?: string | null): string {
  if (!category) return categoryStyles.guide;
  return categoryStyles[category as ContentCategory] ?? categoryStyles.guide;
}
