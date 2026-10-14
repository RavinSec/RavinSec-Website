import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

import type { Media } from "@/payload-types";

/**
 * Serialisable post shapes shared by server fetchers and client components.
 * Kept free of Payload runtime imports so it is safe in client bundles.
 */

export type ContentBasePath = "/blog" | "/news";

export type ContentPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  previewText?: string;
  category?: string;
  author?: string;
  coverImage?: Media | number | string | null;
};

export type ContentPostDetail = ContentPost & {
  body?: DefaultTypedEditorState | null;
  /** Estimated from the full body text (falls back to the excerpt). */
  readMinutes: number;
};

export function urlForImage(source: Media | number | string | null | undefined): string | null {
  if (!source || typeof source === "number" || typeof source === "string") return null;
  return source.url ?? null;
}
