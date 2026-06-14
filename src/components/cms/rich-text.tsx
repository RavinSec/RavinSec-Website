import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";

type RichTextProps = {
  data: DefaultTypedEditorState | null | undefined;
  className?: string;
};

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;

  return (
    <div className={className ?? "prose-content"}>
      <RichTextConverter data={data} />
    </div>
  );
}
