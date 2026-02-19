# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — Start dev server with Turbopack (http://localhost:3000)
- `pnpm build` — Production build
- `pnpm lint` — ESLint across src/
- `pnpm format` — Prettier format all files
- `pnpm format:check` — Check formatting without writing
- `pnpm typegen` — Extract Sanity schema and generate TypeScript types (outputs to `src/sanity/extract.json`)

## Environment Variables

Copy `.env.example` to `.env.local`. Required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `SANITY_API_READ_TOKEN` — Sanity read token (for live preview/draft mode)
- `RESEND_API_KEY` — For the contact form API route
- `SANITY_REVALIDATE_SECRET` — Webhook revalidation secret

## Tech Stack

Next.js 16 (App Router, React 19, React Compiler enabled), Sanity v4 with next-sanity v11, Tailwind CSS 4, Motion (framer-motion), pnpm.

## Architecture

### Routing

The app uses a `(marketing)` route group with a shared layout that fetches site settings (navbar, footer, announcement banner) from Sanity. The Sanity Studio is embedded at `/studio` via a catch-all route (`src/app/studio/[[...tool]]/`).

### Page Builder

Pages are built using a composable section system:
1. The `page` document type in Sanity has a `sections` array field accepting 14 section types (sectionHero, sectionCta, sectionFeaturesGrid, etc.)
2. `src/components/page-builder/section-renderer.tsx` maps each `_type` to its React component via a switch statement
3. `PAGE_BUILDER_QUERY` in `src/sanity/lib/queries.ts` fetches the page and also co-fetches related documents (features, testimonials, integrations, stats, teamMembers) which are passed to sections as `data`

The home page (`/`) uses slug `"home"`. Dynamic pages use `src/app/(marketing)/[slug]/page.tsx` which filters out reserved slugs (home, about, contact).

### Data Fetching

All Sanity data fetching uses `sanityFetch` from `src/sanity/lib/live.ts` (wraps `defineLive` from next-sanity). GROQ queries are defined centrally in `src/sanity/lib/queries.ts` using `defineQuery`. A shared `imageFragment` is used across queries for consistent image data.

### Sanity Schema Organization

Schema types in `src/sanity/schemaTypes/` are organized into:
- `documents/` — Content types (page, blogPost, caseStudy, author, siteSettings, etc.)
- `sections/` — Page builder section types (sectionHero, sectionCta, etc.)
- `objects/` — Reusable objects (seo, link, socialLink, metric, pricingFeature)
- `blocks/` — Portable Text custom blocks (pteImage, pteCallout, pteCode)

All types are registered in `src/sanity/schemaTypes/index.ts`. Studio structure is customized in `src/sanity/structure.ts` with siteSettings as a singleton. Presentation tool resolve mappings are in `src/sanity/presentation/resolve.ts`.

### Key Patterns

- **Images**: Use `SanityImage` component (`src/components/ui/sanity-image.tsx`) which handles hotspot/crop, LQIP blur placeholders, and dimension calculation. Image URLs built via `urlFor` from `src/sanity/lib/image.ts`.
- **Portable Text**: Custom renderer at `src/components/content/portable-text.tsx` with support for pteImage, pteCallout, pteCode blocks plus heading anchors.
- **Icons**: Sanity documents store icon names as strings. Use `getIcon()` from `src/lib/icon-map.ts` to resolve Lucide icon components.
- **Utility**: `cn()` (clsx + tailwind-merge) and `formatDate()` in `src/lib/utils.ts`.
- **Draft Mode / Visual Editing**: Root layout conditionally renders `<VisualEditing />` and `<DisableDraftMode />` when draft mode is active. API routes at `src/app/api/draft-mode/`.

### Adding a New Page Builder Section

1. Create schema in `src/sanity/schemaTypes/sections/section-*.ts`
2. Register it in `src/sanity/schemaTypes/index.ts`
3. Add it to the `page` document's sections array in `src/sanity/schemaTypes/documents/page.ts`
4. Add query handling in `PAGE_BUILDER_QUERY` if the section needs special projections
5. Create the React component
6. Add a case to the switch in `src/components/page-builder/section-renderer.tsx`

### API Routes

- `POST /api/contact` — Contact form submission (uses Resend)
- `GET/POST /api/revalidate` — On-demand revalidation webhook
- `GET /api/search` — Search endpoint using GROQ
- `GET /api/og` — Dynamic OG image generation
- `GET/POST /api/draft-mode/enable|disable` — Sanity preview draft mode
