import Image from "next/image";
import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedHeadingNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import {
  type JSXConvertersFunction,
  RichText as RichTextConverter,
} from "@payloadcms/richtext-lexical/react";

import type { Media } from "@/payload-types";
import { headingId } from "@/lib/lexical-text";
import { cn } from "@/lib/utils";

type RichTextProps = {
  data: DefaultTypedEditorState | null | undefined;
  className?: string;
};

function nodeText(node: { children?: unknown[] }): string {
  const parts: string[] = [];
  const walk = (n: unknown) => {
    if (!n || typeof n !== "object") return;
    const record = n as { text?: unknown; children?: unknown[] };
    if (typeof record.text === "string") parts.push(record.text);
    record.children?.forEach(walk);
  };
  node.children?.forEach(walk);
  return parts.join("").replace(/\s+/g, " ").trim();
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,

  // Anchored headings so the table of contents can deep-link into the article.
  heading: ({ node, nodesToJSX, childIndex }) => {
    const heading = node as SerializedHeadingNode;
    const Tag = heading.tag;
    const id = headingId(nodeText(heading), childIndex);
    return (
      <Tag id={id} className="scroll-mt-28">
        {nodesToJSX({ nodes: heading.children })}
      </Tag>
    );
  },

  // Optimised, captioned images via next/image.
  upload: ({ node }) => {
    const upload = node as SerializedUploadNode;
    if (typeof upload.value !== "object" || upload.value === null) return null;
    const media = upload.value as Media;
    if (!media.url) return null;
    if (media.mimeType && !media.mimeType.startsWith("image")) {
      return (
        <a href={media.url} rel="noopener noreferrer" target="_blank">
          {media.filename ?? media.url}
        </a>
      );
    }
    const alt = media.alt ?? "";
    const width = media.width ?? 1600;
    const height = media.height ?? 900;
    return (
      <figure className="not-prose my-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-soft">
          <Image
            src={media.url}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 720px"
            className="h-auto w-full"
          />
        </div>
        {alt ? (
          <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },
});

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;

  return (
    <div className={cn("prose-content", className)}>
      <RichTextConverter data={data} converters={converters} />
    </div>
  );
}
