import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { BlogPosts } from "./collections/BlogPosts";
import { Media } from "./collections/Media";
import { NewsPosts } from "./collections/NewsPosts";
import { PartnerLogos } from "./collections/PartnerLogos";
import { Testimonies } from "./collections/Testimonies";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Production (ravinsec.ir) keeps its content in SQLite (`file:/app/data/payload.db`).
 * Local development uses PostgreSQL. The URL scheme picks the adapter.
 */
const databaseUrl = process.env.DATABASE_URL || "";
const db = databaseUrl.startsWith("file:")
  ? sqliteAdapter({
      client: { url: databaseUrl },
    })
  : postgresAdapter({
      pool: { connectionString: databaseUrl },
    });

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname, "app/(payload)/admin"),
    },
  },
  collections: [Users, Media, BlogPosts, NewsPosts, Testimonies, PartnerLogos],
  db,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
