type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

function collectText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  if (!Array.isArray(node.children)) return "";
  return node.children.map(collectText).join("");
}

type LexicalBody = {
  root?: {
    children?: LexicalNode[];
  };
} | null | undefined;

/** First non-empty block of plain text from a Lexical rich-text field. */
export function extractFirstParagraph(body: LexicalBody): string | undefined {
  const blocks = body?.root?.children;
  if (!blocks?.length) return undefined;

  for (const block of blocks) {
    const text = collectText(block).replace(/\s+/g, " ").trim();
    if (text) return text;
  }

  return undefined;
}

/** Every text node of a Lexical body joined into one string (for read-time estimates). */
export function extractPlainText(body: LexicalBody): string {
  const blocks = body?.root?.children;
  if (!blocks?.length) return "";
  return blocks
    .map((block) => collectText(block))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPostPreviewText(
  excerpt?: string | null,
  body?: LexicalBody,
): string | undefined {
  const fromBody = extractFirstParagraph(body);
  if (fromBody) return fromBody;

  const trimmedExcerpt = excerpt?.trim();
  return trimmedExcerpt || undefined;
}

export type PostHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Stable anchor id for a heading. Keeps Persian/Arabic letters and digits so
 * anchors stay readable; falls back to an index-based id for symbol-only text.
 */
export function headingId(text: string, index: number): string {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[\u200c\u200d]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug ? `${slug}-${index}` : `section-${index}`;
}

/**
 * h2/h3 headings of a body, in document order, with the same ids `RichText`
 * renders (both derive the id from the heading's index among root children).
 */
export function extractHeadings(body: LexicalBody): PostHeading[] {
  const blocks = body?.root?.children;
  if (!blocks?.length) return [];

  const headings: PostHeading[] = [];
  blocks.forEach((block, index) => {
    if (block.type !== "heading") return;
    const level = block.tag === "h3" ? 3 : block.tag === "h2" ? 2 : null;
    const text = collectText(block).replace(/\s+/g, " ").trim();
    if (!level || !text) return;
    headings.push({ id: headingId(text, index), text, level });
  });
  return headings;
}
