import { slugField } from "payload";
import type { Field } from "payload";

export const contentPostFields: Field[] = [
  {
    name: "title",
    type: "text",
    required: true,
  },
  {
    name: "publishedAt",
    type: "date",
    required: true,
    admin: {
      date: {
        pickerAppearance: "dayAndTime",
      },
    },
  },
  {
    name: "excerpt",
    type: "textarea",
  },
  {
    name: "category",
    type: "select",
    options: [
      { label: "تحلیل تهدید", value: "threat-analysis" },
      { label: "راهنمای رفع", value: "remediation" },
      { label: "راهنما", value: "guide" },
      { label: "اعلامیه", value: "announcement" },
      { label: "به‌روزرسانی", value: "update" },
    ],
  },
  {
    name: "author",
    type: "text",
    defaultValue: "تیم RavinSec",
  },
  {
    name: "coverImage",
    type: "upload",
    relationTo: "media",
  },
  {
    name: "body",
    type: "richText",
  },
  slugField({ fieldToUse: "title" }),
];
