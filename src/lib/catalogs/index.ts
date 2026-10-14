import { afrasiCatalog } from "./afrasi";
import type { Catalog } from "./types";

export type * from "./types";

/** Registry of published product catalogs, in display order. */
export const catalogs: Catalog[] = [afrasiCatalog];

export function getCatalogBySlug(slug: string): Catalog | undefined {
  return catalogs.find((catalog) => catalog.slug === slug);
}

export function getCatalogSlugs(): string[] {
  return catalogs.map((catalog) => catalog.slug);
}

/** Section anchors used by the sticky chapter navigation on a catalog page. */
export const catalogSections = [
  { id: "intro", label: "معرفی" },
  { id: "spotlight", label: "کیوسک و مرورگر ایزوله" },
  { id: "features", label: "ویژگی‌ها" },
  { id: "chapters", label: "بخش‌ها" },
  { id: "company", label: "درباره راوین‌سک" },
] as const;

export type CatalogSectionId = (typeof catalogSections)[number]["id"];
