# SaaS Marketing Site — Project Requirements

## Social Media Scheduling Tool (Fictional Product)

**Next.js (App Router) + Sanity CMS | Portfolio Project**

---

## 1. Project Overview

A marketing website for a fictional social media scheduling platform, built with Next.js and Sanity CMS. The site demonstrates enterprise-grade content modeling, editorial workflows, and modern web performance — designed as a portfolio piece targeting SaaS/startup clients on Upwork.

**Fictional Product:** "Postly" — an all-in-one social media scheduling and analytics platform for teams and agencies. Schedule posts across Instagram, X (Twitter), LinkedIn, Facebook, and TikTok from one dashboard.

**Tagline:** "Schedule smarter. Grow faster."

> **Important:** You are NOT building the actual scheduling tool. You are building the public-facing marketing website that sells it. The "product" is represented through screenshots, mockups, and feature descriptions managed in Sanity.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Server Components) |
| CMS | Sanity v3 (Studio embedded or standalone) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deployment | Vercel |
| Email | Resend (contact form, newsletter) |
| Analytics | Vercel Analytics or Plausible |
| Icons | Lucide React |
| Animations | Framer Motion (subtle, purposeful) |

---

## 3. Pages & Features

### 3.1 Homepage

The main landing page that converts visitors. All sections are CMS-managed.

- **Hero section** — headline, subheadline, CTA buttons ("Start Free Trial" + "Watch Demo"), product screenshot/mockup, trusted-by logos
- **Social proof bar** — logo carousel of fictional customers (agencies, brands, creators)
- **Pain point section** — 3 problems the product solves (managing multiple accounts, inconsistent posting, lack of analytics) with icons
- **Features grid** — 6–9 feature cards (icon, title, description). Examples:
  - Multi-platform scheduling (Instagram, X, LinkedIn, Facebook, TikTok)
  - AI-powered caption suggestions
  - Visual content calendar (drag & drop)
  - Team collaboration & approval workflows
  - Analytics dashboard with engagement metrics
  - Best time to post recommendations
  - Bulk scheduling & CSV import
  - Hashtag manager
  - Link in bio page builder
- **How it works** — 3-step visual flow (Connect accounts → Create & schedule → Track results)
- **Testimonials section** — quote, name, role, avatar, company
- **Integrations showcase** — grid of platform logos (Instagram, X, LinkedIn, Canva, Google Drive, Zapier, Slack, Notion)
- **Stats section** — impressive numbers ("10M+ posts scheduled", "50K+ teams", "99.9% uptime")
- **CTA banner** — email capture for free trial signup

### 3.2 Features Page

Dedicated page with deeper feature breakdowns.

- **Hero** — headline + subheadline
- **Feature sections** — alternating layout (image left/text right, then flip). Each feature includes:
  - Title, description (Portable Text)
  - Product screenshot/mockup
  - Supporting bullet points
- **Platform support section** — icons + descriptions for each supported social network
- **Bottom CTA** — "Start your free trial"

### 3.3 Pricing Page

- **Monthly / Annual toggle** with savings badge ("Save 20%")
- **3 pricing tiers as cards:**
  - **Free** — 1 user, 3 social accounts, 10 scheduled posts/month
  - **Pro ($19/mo)** — 3 users, 10 social accounts, unlimited posts, analytics, AI captions
  - **Business ($49/mo)** — unlimited users, unlimited accounts, team approvals, custom reports, priority support
- **Highlighted recommended plan** (Pro)
- **Feature comparison table** — checkmark/cross per tier (15–20 features)
- **Enterprise CTA** — "Need more? Contact us for custom pricing"
- **FAQ accordion** — 6–8 billing/feature questions

### 3.4 Blog

Content marketing hub focused on social media marketing topics.

**Blog listing page:**
- Grid/list of posts with cover image, title, excerpt, author, date, category badge
- Pagination (8 posts per page)
- Category filtering (Social Media Tips, Product Updates, Case Studies, Industry Trends)
- Search functionality

**Individual blog post page:**
- Cover image (full-width or contained)
- Title, author bio card, published date, reading time
- Portable Text body with support for:
  - Headings, paragraphs, blockquotes
  - Images with captions
  - Code blocks (for embed code tutorials)
  - Callout/tip boxes
  - Embedded tweets/social posts (via custom component)
- Auto-generated table of contents from headings
- Related posts section (same category)
- Social share buttons (X, LinkedIn, Facebook, copy link)
- Newsletter CTA at bottom

**RSS feed** — /feed.xml

### 3.5 Changelog

Product update log.

- Date-sorted entries (newest first)
- Entry type badges: **New Feature**, **Improvement**, **Fix**, **Breaking Change**
- Version number per entry (e.g., v3.2.0)
- Portable Text body for each entry
- Filter by entry type
- Subscribe to updates CTA

### 3.6 Case Studies

Customer success stories.

**Listing page:**
- Card grid with company logo, name, one-line result, industry tag
- Featured case study hero at top

**Individual case study page:**
- Company info sidebar: logo, name, industry, company size, platforms used
- Structured layout:
  - **Challenge** — what problem they faced
  - **Solution** — how Postly helped
  - **Results** — measurable outcomes
- Key metrics displayed as stat cards (e.g., "3x engagement increase", "10 hrs/week saved", "150% follower growth")
- Pull quote / testimonial from client
- "Was this helpful?" feedback widget
- Related case studies

**Example case studies:**
1. A digital marketing agency managing 40+ client accounts
2. A D2C e-commerce brand scaling their social presence
3. A SaaS startup building brand awareness on LinkedIn

### 3.7 About Page

- Company story section (Portable Text) — founding story, mission
- Values / mission section — 4 value cards (icon + title + description)
- Team member grid — photo, name, role, short bio, social links (LinkedIn, X)
- Office/culture images (optional)
- Open positions CTA → links to careers or contact

### 3.8 Contact Page

- Contact form with validation:
  - Name (required)
  - Work email (required)
  - Company name
  - Topic dropdown (General inquiry, Sales, Support, Partnership, Enterprise pricing)
  - Message (required)
- Form submission via Next.js API route + Resend
- Success / error state handling with clear messaging
- Alternative contact info (email, social links)
- FAQ section — "Before you reach out, check these common questions"

### 3.9 Legal Pages

- **Privacy Policy** — CMS-managed Portable Text
- **Terms of Service** — CMS-managed Portable Text
- Last updated date shown on each page
- Clean, readable typography (no legal wall-of-text feel)

---

## 4. Global Components

Site-wide elements managed from Sanity.

- **Navigation bar** — logo, nav links (Features, Pricing, Blog, Case Studies), CTA button ("Start Free Trial"). Sticky on scroll with background blur.
- **Mobile navigation** — hamburger menu with slide-in panel
- **Footer** — 4 link columns (Product, Resources, Company, Legal), social icons, newsletter signup, copyright
- **Announcement banner** — dismissible, CMS-controlled text + link + enabled toggle. Example: "🎉 New: TikTok scheduling is here! Learn more →"
- **Command palette / search** (Cmd+K) — searches blog, changelog, and case studies
- **Dark mode / light mode toggle** with system preference detection
- **Cookie consent banner**
- **Back to top button** — appears on scroll

---

## 5. Sanity CMS Schemas

| Schema | Key Fields |
|--------|-----------|
| `blogPost` | title, slug, excerpt, body (Portable Text), author (ref), categories (ref[]), publishedAt, coverImage, seoTitle, seoDescription, ogImage |
| `author` | name, slug, bio, avatar, role, socialLinks (X, LinkedIn) |
| `category` | title, slug, description, color |
| `caseStudy` | title, slug, companyName, companyLogo, industry, companySize, platformsUsed, challenge (Portable Text), solution (Portable Text), results (Portable Text), metrics (array of {label, value}), testimonialQuote, testimonialAuthor, testimonialRole |
| `changelogEntry` | title, version, date, type (feature / fix / improvement / breaking), body (Portable Text) |
| `pricingTier` | name, monthlyPrice, annualPrice, description, features (array of {text, included: boolean}), highlighted (boolean), ctaText, ctaLink |
| `pricingFAQ` | question, answer (Portable Text), order |
| `feature` | title, slug, description, icon, detailedDescription (Portable Text), screenshot, order |
| `teamMember` | name, role, bio, photo, socialLinks, order |
| `testimonial` | quote, name, role, company, avatar, featured (boolean) |
| `integration` | name, logo, description, url, category |
| `legalPage` | title, slug, body (Portable Text), lastUpdated |
| `siteSettings` | siteName, logo, darkLogo, navLinks, footerLinks, socialLinks, announcementBanner {text, link, enabled}, defaultSEO {title, description, ogImage} |
| `statsItem` | label, value, icon, order |

---

## 6. Technical Requirements

### 6.1 Performance & Rendering

- Static Generation (SSG) for marketing pages, blog posts, case studies
- Incremental Static Regeneration (ISR) with on-demand revalidation via Sanity webhook
- Server Components by default, Client Components only where needed (search, toggles, forms, command palette)
- Image optimization via `next/image` with Sanity image pipeline
- Lazy loading for below-the-fold sections
- Target: **95+ Lighthouse score** across all pages

### 6.2 SEO

- Dynamic metadata per page from CMS (title, description)
- Open Graph images — auto-generated or CMS-uploaded per page
- `sitemap.xml` generation (dynamic from all published routes)
- `robots.txt`
- JSON-LD structured data:
  - `Organization` (homepage)
  - `Article` (blog posts)
  - `FAQPage` (pricing FAQ)
  - `BreadcrumbList` (all pages)
- Canonical URLs on every page
- Proper heading hierarchy (single H1 per page)

### 6.3 Editorial Workflow

- Draft / Published content states in Sanity
- Live preview mode — editors see unpublished changes in the Next.js frontend
- Sanity Studio accessible at `/studio` or `studio.postly.dev`
- Webhook-triggered revalidation on content publish
- Portable Text with custom components (callouts, embedded social posts, tip boxes)

### 6.4 Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML throughout
- Keyboard navigation (all interactive elements focusable and operable)
- Skip-to-content link
- ARIA labels on icons, buttons, and interactive elements
- Focus trap in modals and mobile nav
- Color contrast ratios meeting AA standards in both light and dark mode

### 6.5 Responsive Design

- Mobile-first approach
- Breakpoints: mobile (< 640px), tablet (640–1024px), desktop (> 1024px)
- Mobile hamburger menu with smooth animation
- Touch-friendly targets (min 44px)
- Responsive images with appropriate sizes/srcset
- Tables scroll horizontally on mobile (pricing comparison)

---

## 7. Deployment & DevOps

- Vercel deployment with preview branches (every PR gets a preview URL)
- Environment variables: Sanity project ID, dataset, API token, Resend API key
- Sanity webhook endpoint for on-demand ISR (`/api/revalidate`)
- Custom domain (e.g., `postly.dev`)
- Sanity Studio deployed at `/studio` or separate subdomain
- GitHub repo with clean commit history and conventional commits

---

## 8. Demo Content

Pre-populate Sanity with realistic content to make the portfolio piece convincing.

| Content Type | Quantity | Topic Examples |
|-------------|----------|---------------|
| Blog Posts | 6–8 | "10 Instagram Scheduling Hacks for 2025", "How to Build a LinkedIn Content Strategy", "Why Consistency Beats Virality", "Our 2025 Product Roadmap" |
| Case Studies | 3 | Digital marketing agency, D2C e-commerce brand, SaaS startup |
| Changelog Entries | 10–12 | TikTok support launch, AI caption generator, bulk scheduling, analytics dashboard redesign, bug fixes |
| Team Members | 4–6 | CEO, CTO, Head of Product, Head of Marketing, Designer, Engineer |
| Testimonials | 5–6 | Social media managers, agency owners, startup founders, content creators |
| Integrations | 8–10 | Instagram, X, LinkedIn, Facebook, TikTok, Canva, Google Drive, Zapier, Slack, Notion |
| Pricing Tiers | 3 | Free, Pro ($19/mo), Business ($49/mo) |
| Pricing FAQs | 6–8 | Free trial, cancellation, team seats, payment methods, annual billing, enterprise |
| Features | 8–10 | Multi-platform scheduling, AI captions, content calendar, analytics, team collaboration, hashtag manager, best time to post, link in bio, bulk scheduling |
| Stats | 4 | "10M+ posts scheduled", "50K+ teams", "99.9% uptime", "4.8★ average rating" |
| Legal Pages | 2 | Privacy Policy, Terms of Service |

---

## 9. Portfolio Presentation Extras

These differentiate your portfolio from competitors on Upwork.

- **Live demo** on a custom domain with realistic content
- **Sanity Studio demo link** (read-only) so clients can explore the editorial experience
- **Loom walkthrough** (2–3 min) showing how a non-technical person updates content, publishes a blog post, and sees it go live
- **README** with setup instructions, env variables, architecture diagram, and tech decisions
- **GitHub repo** with clean code, conventional commits, and proper folder structure
- **Lighthouse screenshot** showing 95+ scores
- **Architecture diagram** showing Next.js ↔ Sanity ↔ Vercel data flow

---

## 10. Suggested Timeline

| Week | Focus | Deliverables |
|------|-------|-------------|
| Week 1 | Foundation | Project setup, Sanity schemas, global layout (nav, footer, dark mode), homepage, announcement banner |
| Week 2 | Core Pages | Features page, pricing (toggle, comparison table, FAQ), about page, contact form with Resend |
| Week 3 | Content Pages | Blog (list + detail + categories + RSS), changelog (list + filtering), case studies (list + detail) |
| Week 4 | Polish & Ship | SEO (sitemap, OG images, JSON-LD), live preview, Cmd+K search, performance audit, demo content population, deploy, record Loom walkthrough |

---

## 11. Folder Structure (Suggested)

```
postly-marketing/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage
│   │   ├── features/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── changelog/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx          # Listing
│   │   │   └── [slug]/page.tsx   # Individual
│   │   └── [slug]/page.tsx       # Legal pages
│   ├── api/
│   │   ├── revalidate/route.ts   # Sanity webhook
│   │   └── contact/route.ts      # Contact form
│   ├── studio/[[...tool]]/page.tsx  # Embedded Sanity Studio
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── global/                   # Nav, Footer, Banner, CommandPalette
│   ├── home/                     # Hero, Features, Testimonials, etc.
│   ├── blog/                     # PostCard, TOC, ShareButtons
│   ├── pricing/                  # PricingCard, ComparisonTable, FAQ
│   ├── case-studies/             # CaseStudyCard, MetricCard
│   └── ui/                       # Button, Badge, Card, etc.
├── sanity/
│   ├── schemas/                  # All schema files
│   ├── lib/
│   │   ├── client.ts             # Sanity client
│   │   ├── queries.ts            # GROQ queries
│   │   └── image.ts              # Image URL builder
│   └── sanity.config.ts
├── lib/
│   ├── utils.ts                  # Helper functions
│   └── types.ts                  # TypeScript interfaces
├── public/
│   ├── images/
│   └── fonts/
├── .env.local
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

*— End of Requirements —*
