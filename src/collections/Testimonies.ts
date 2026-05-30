import type { CollectionConfig } from "payload";

export const Testimonies: CollectionConfig = {
  slug: "testimonies",
  labels: {
    singular: "Testimony",
    plural: "Testimonies",
  },
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "role", "featured", "sortOrder"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "industry",
      type: "text",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Featured testimony appears in the large hero card.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first.",
      },
    },
  ],
};
