export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** Rough read-time from excerpt (~200 Persian words/min). */
export function estimateReadMinutes(excerpt?: string | null, fallback = 4): number {
  if (!excerpt?.trim()) return fallback;
  const words = excerpt.trim().split(/\s+/).length;
  return Math.max(1, Math.min(20, Math.round(words / 200) || fallback));
}

export function formatReadTime(minutes: number): string {
  return `${toPersianDigits(minutes)} دقیقه مطالعه`;
}
