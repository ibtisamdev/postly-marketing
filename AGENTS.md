# AGENTS.md

Agent guidance for the Postly marketing site — Next.js 16 + Sanity v4 + Tailwind CSS 4.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack (http://localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint across src/ (Next.js Core Web Vitals + TypeScript rules)
pnpm format       # Prettier format all files (writes in place)
pnpm format:check # Check formatting without writing
pnpm typegen      # Extract Sanity schema → src/sanity/extract.json, generate TS types
```

**No test framework is configured.** There is no `pnpm test` command. Verify changes with
`pnpm build` and `pnpm lint`.

## Environment Setup

Copy `.env.example` to `.env.local` and populate:

| Variable                        | Purpose                                  |
| ------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                        |
| `SANITY_API_READ_TOKEN`         | Read token for live preview / draft mode |
| `RESEND_API_KEY`                | Contact form email delivery              |
| `SANITY_REVALIDATE_SECRET`      | Webhook on-demand revalidation secret    |

## Architecture

### Routing

- `src/app/(marketing)/` — marketing pages with shared layout (fetches navbar, footer,
  announcement banner from Sanity)
- `src/app/studio/[[...tool]]/` — embedded Sanity Studio at `/studio`
- `src/app/api/` — API routes: `contact`, `revalidate`, `search`, `og`, `draft-mode`

### Page Builder

Pages are assembled from a `sections[]` array in Sanity:

1. `page` document → `sections[]` accepting 14+ section types
2. `src/components/page-builder/section-renderer.tsx` maps `_type` → React component
3. `PAGE_BUILDER_QUERY` co-fetches the page **and** related collections (features,
   testimonials, integrations, stats, teamMembers) in one query; results passed as `data`

Home page uses slug `"home"`. Dynamic pages live in `src/app/(marketing)/[slug]/page.tsx`
which filters reserved slugs (home, about, contact).

### Data Fetching

All Sanity fetches use `sanityFetch` from `src/sanity/lib/live.ts` (wraps `defineLive`
from next-sanity). GROQ queries are defined centrally in `src/sanity/lib/queries.ts`
using `defineQuery`. A shared `imageFragment` is interpolated across queries.

## Code Style

### File & Directory Naming

- All files: **`kebab-case.tsx`** / **`.ts`** — no camelCase filenames
- Directories: `kebab-case/` including route groups `(marketing)/`
- Schema files: `section-hero.ts`, `section-cta.ts`, etc.
- Next.js conventions take precedence: `page.tsx`, `route.ts`, `layout.tsx`, `[slug]/`

### Exports

- **Named exports** for all components, utilities, schemas, and queries
- **`export default`** only for Next.js pages (required by the framework)
- No barrel/index re-export files — import directly by path
- Types declared locally; only re-exported when consumed cross-file

### TypeScript

- Use `type`, never `interface`
- Component return types are **inferred** — do not annotate `: JSX.Element`
- Utility functions and `async` page functions get **explicit return types**
- Use `import type` for pure type imports: `import type { Metadata } from 'next'`
- Sanity nullable fields: `string | null` (required but nullable)
- Optional component props: `?` suffix — combined: `eyebrow?: string | null`
- Next.js page params typed as `Promise<{ slug: string }>`, then `await`-ed inside
- Avoid `as any`; add `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
  when unavoidable; use file-level disable only for systemic cases

### Imports

Three groups separated by blank lines:

```ts
// 1. Framework / third-party (type-only imports first within group)
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// 2. Internal paths — always use @/ alias, never relative ../
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BUILDER_QUERY } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/components/page-builder/section-renderer'
import { cn } from '@/lib/utils'
```

Multi-named imports are multi-line with a trailing comma:

```ts
import { BLOG_POST_BY_SLUG_QUERY, BLOG_SLUGS_QUERY } from '@/sanity/lib/queries'
```

### Components

Server components are the default — no directive, `async`, data fetched with `await`:

```ts
export default async function HomePage() {
  const { data } = await sanityFetch({ query: PAGE_BUILDER_QUERY, params: { slug: 'home' } })
  if (!data?.page) notFound()
  return <SectionRenderer sections={data.page.sections} data={data} />
}
```

Client components: `'use client'` as the **very first line** (before imports), only when
state, event handlers, or browser APIs are needed.

Props use default parameter values in destructuring — no fallback logic in the body:

```ts
export function SanityImage({ value, width = 800, priority = false }: SanityImageProps) { ... }
```

### Class Names

Always use `cn()` from `@/lib/utils` (clsx + tailwind-merge). Base classes first,
conditional expression second. Multi-line when more than one argument:

```ts
className={cn(
  'ml-4 h-5 w-5 shrink-0 transition-transform',
  isOpen && 'rotate-180',
)}
```

### Error Handling (API Routes)

Single `try/catch` wrapping the entire handler. Guard clauses with early returns before
main logic. Bare `catch {}` — no error variable required for generic 500 responses:

```ts
export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY)
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 },
      )
    const { name, email } = await request.json()
    if (!name || !email)
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      )
    // ... business logic
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    )
  }
}
```

Error shape: `{ error: string }` with HTTP status. Success shape: `{ success: true }`.

### Sanity Schemas

- Always use `defineType` + `defineField`, never raw objects
- Section types: `type: 'object'`; icon from `@sanity/icons`
- Export variable name (camelCase) must exactly match the `name` string: `export const sectionHero = defineType({ name: 'sectionHero', ... })`
- Every schema needs a `preview` block with `prepare()` and a `|| 'Untitled'` fallback
- Validation uses callback form: `validation: (rule) => rule.required()`
- Reusable object types (e.g. `link`) are referenced by string name, not inlined

### GROQ Queries

- All queries wrapped in `defineQuery()`, named `SCREAMING_SNAKE_CASE_QUERY`
- Use `/* groq */` tag on the template literal for IDE syntax highlighting
- Shared `imageFragment` interpolated via `${imageFragment}` to avoid repetition
- Co-fetch pattern: one query object that returns page + related collections
- Conditional projections: `_type == "sectionHero" => { backgroundImage { ${imageFragment} } }`
- Computed/renamed fields use quoted keys: `"slug": slug.current`

## Adding a New Page Builder Section

1. Create schema in `src/sanity/schemaTypes/sections/section-<name>.ts`
2. Register it in `src/sanity/schemaTypes/index.ts`
3. Add it to the `sections` array in `src/sanity/schemaTypes/documents/page.ts`
4. Add projections in `PAGE_BUILDER_QUERY` in `src/sanity/lib/queries.ts` if the
   section needs image fields or dereferenced data
5. Create the React component in `src/components/` (named export, kebab-case file)
6. Add a `case` to the switch in `src/components/page-builder/section-renderer.tsx`

## Key Utilities

| Utility        | Location                                   | Purpose                                        |
| -------------- | ------------------------------------------ | ---------------------------------------------- |
| `cn()`         | `src/lib/utils.ts`                         | clsx + tailwind-merge class merging            |
| `formatDate()` | `src/lib/utils.ts`                         | Locale date formatting                         |
| `getIcon()`    | `src/lib/icon-map.ts`                      | Resolve Lucide icon component from string name |
| `urlFor()`     | `src/sanity/lib/image.ts`                  | Build Sanity image URLs                        |
| `SanityImage`  | `src/components/ui/sanity-image.tsx`       | Image with hotspot/crop, LQIP blur             |
| `PortableText` | `src/components/content/portable-text.tsx` | Rich text renderer                             |
| `Section`      | `src/components/ui/section.tsx`            | Layout wrapper for page sections               |
