import type { CollectionConfig } from "payload";

import { contentPostFields } from "./fields/content-post-fields";

export const NewsPosts: CollectionConfig = {
  slug: "news-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: contentPostFields,
};
