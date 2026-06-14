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
  remediation: "border-primary/20 bg-primary/5 text-[hsl(217,91%,35%)]",
  guide: "border-border bg-secondary text-muted-foreground",
  announcement: "border-primary/40 bg-primary/10 text-primary",
  update: "border-border bg-secondary text-muted-foreground",
};

export function getCategoryLabel(category?: string | null): string | null {
  if (!category) return null;
  return categoryLabels[category as ContentCategory] ?? category;
}

export function getCategoryStyle(category?: string | null): string {
  if (!category) return categoryStyles.guide;
  return categoryStyles[category as ContentCategory] ?? categoryStyles.guide;
}
