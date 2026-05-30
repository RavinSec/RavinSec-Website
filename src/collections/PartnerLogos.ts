import type { CollectionConfig } from "payload";

export const PartnerLogos: CollectionConfig = {
  slug: "partner-logos",
  labels: {
    singular: "Partner Logo",
    plural: "Partner Logos",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Partner name used for accessibility labels.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        description: "Optional link to the partner website.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first in the marquee.",
      },
    },
  ],
};
