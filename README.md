# RavinSec Website

Marketing site for RavinSec — built with Next.js App Router, shadcn/ui, Tailwind CSS, Payload CMS, and a Resend-powered contact form.

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **UI:** shadcn/ui, Tailwind CSS (dark default)
- **Motion:** Framer Motion (subtle page transitions)
- **CMS:** Payload CMS (`src/payload.config.ts`, admin at `/admin`)
- **Forms:** react-hook-form + zod, `/api/contact`

## Getting started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Environment**

   ```bash
   cp .env.example .env.local
   ```

   Set `DATABASE_URL`, `PAYLOAD_SECRET`, and Resend values. The site runs without CMS credentials; blog/news listings stay empty until Payload is connected.

3. **Start PostgreSQL (local)**

   ```bash
   docker compose up -d
   ```

4. **Run dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The Payload admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin) — create your first admin user on first visit.

## Payload CMS

Payload runs inside the Next.js app (open source, self-hosted). Content collections:

- `blog-posts` — long-form articles at `/blog`
- `news-posts` — updates and announcements at `/news`
- `media` — uploads for cover images

Generate TypeScript types after schema changes:

```bash
pnpm generate:types
```

## Project structure

```
src/
├── app/
│   ├── (marketing)/     # site pages: home, blog, news, contact
│   ├── (payload)/       # Payload admin + REST API
│   └── api/contact/
├── collections/         # Payload collection configs
├── components/ui|sections|layout/
├── lib/cms.ts           # Payload Local API fetchers
└── payload.config.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production |
| `pnpm lint` | ESLint |
| `pnpm generate:types` | Regenerate Payload TypeScript types |

## Deploy

Optimized for [Vercel](https://vercel.com). Use a hosted PostgreSQL database (Neon, Supabase, Vercel Postgres) and set `DATABASE_URL` and `PAYLOAD_SECRET` in the project dashboard.
