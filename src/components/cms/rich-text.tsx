import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";

type RichTextProps = {
  data: DefaultTypedEditorState | null | undefined;
};

export function RichText({ data }: RichTextProps) {
  if (!data) return null;

  return (
    <div className="prose prose-invert max-w-none">
      <RichTextConverter data={data} />
    </div>
  );
}
