type LexicalNode = {
  type?: string;
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

export function getPostPreviewText(
  excerpt?: string | null,
  body?: LexicalBody,
): string | undefined {
  const fromBody = extractFirstParagraph(body);
  if (fromBody) return fromBody;

  const trimmedExcerpt = excerpt?.trim();
  return trimmedExcerpt || undefined;
}
