import { defineQuery } from 'next-sanity'

// ============================================================
// Fragments
// ============================================================

const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  },
  alt,
  hotspot,
  crop
`

// ============================================================
// Site Settings
// ============================================================

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteName,
    logo { ${imageFragment} },
    logoDark { ${imageFragment} },
    navLinks[]{
      _key,
      label,
      linkType,
      href,
      url
    },
    footerLinks1 {
      heading,
      links[]{ _key, label, linkType, href, url }
    },
    footerLinks2 {
      heading,
      links[]{ _key, label, linkType, href, url }
    },
    footerLinks3 {
      heading,
      links[]{ _key, label, linkType, href, url }
    },
    footerLinks4 {
      heading,
      links[]{ _key, label, linkType, href, url }
    },
    socialLinks[]{ _key, platform, url },
    announcementBanner {
      enabled,
      text,
      link { label, linkType, href, url }
    },
    defaultSeo {
      title,
      description,
      image { ${imageFragment} },
      noIndex
    }
  }
`)

// ============================================================
// Homepage
// ============================================================

export const HOMEPAGE_FEATURES_QUERY = defineQuery(`
  *[_type == "feature"] | order(order asc) [0...9] {
    _id,
    title,
    description,
    icon,
    "slug": slug.current
  }
`)

export const HOMEPAGE_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    quote,
    name,
    role,
    company,
    avatar { ${imageFragment} }
  }
`)

export const HOMEPAGE_INTEGRATIONS_QUERY = defineQuery(`
  *[_type == "integration"] | order(name asc) {
    _id,
    name,
    logo { ${imageFragment} },
    description,
    url,
    category
  }
`)

export const HOMEPAGE_STATS_QUERY = defineQuery(`
  *[_type == "statsItem"] | order(order asc) {
    _id,
    label,
    value,
    icon
  }
`)

// ============================================================
// Blog
// ============================================================

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage { ${imageFragment} },
    author->{ name, avatar { ${imageFragment} } },
    categories[]->{ _id, title, "slug": slug.current, color }
  }
`)

export const BLOG_POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "blogPost" && defined(slug.current)])
`)

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage { ${imageFragment} },
    body[]{
      ...,
      _type == "pteImage" => {
        ...,
        image { ${imageFragment} }
      }
    },
    author->{ name, "slug": slug.current, avatar { ${imageFragment} }, role, bio },
    categories[]->{ _id, title, "slug": slug.current, color },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, excerpt, ""),
      "image": seo.image { ${imageFragment} },
      "noIndex": seo.noIndex == true
    }
  }
`)

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    color,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }
`)

export const BLOG_RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage { ${imageFragment} },
    author->{ name, avatar { ${imageFragment} } }
  }
`)

// ============================================================
// Features
// ============================================================

export const FEATURES_QUERY = defineQuery(`
  *[_type == "feature"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    detailedDescription[]{
      ...,
      _type == "pteImage" => {
        ...,
        image { ${imageFragment} }
      }
    },
    screenshot { ${imageFragment} },
    order
  }
`)

// ============================================================
// Pricing
// ============================================================

export const PRICING_TIERS_QUERY = defineQuery(`
  *[_type == "pricingTier"] | order(order asc) {
    _id,
    name,
    monthlyPrice,
    annualPrice,
    description,
    features[]{ _key, text, included },
    highlighted,
    cta { label, linkType, href, url },
    order
  }
`)

export const PRICING_FAQS_QUERY = defineQuery(`
  *[_type == "pricingFAQ"] | order(order asc) {
    _id,
    question,
    answer,
    "answerText": pt::text(answer),
    order
  }
`)

// ============================================================
// Case Studies
// ============================================================

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    companyName,
    logo { ${imageFragment} },
    industry,
    featured,
    coverImage { ${imageFragment} },
    metrics[]{ _key, label, value, icon }
  }
`)

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    companyName,
    logo { ${imageFragment} },
    industry,
    featured,
    coverImage { ${imageFragment} },
    challenge,
    solution,
    results,
    metrics[]{ _key, label, value, icon },
    testimonialQuote,
    testimonialAuthor,
    testimonialRole,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, ""),
      "image": seo.image { ${imageFragment} },
      "noIndex": seo.noIndex == true
    }
  }
`)

// ============================================================
// Changelog
// ============================================================

export const CHANGELOG_ENTRIES_QUERY = defineQuery(`
  *[_type == "changelogEntry"] | order(date desc) {
    _id,
    title,
    version,
    date,
    changeType,
    body[]{
      ...,
      _type == "pteImage" => {
        ...,
        image { ${imageFragment} }
      }
    }
  }
`)

// ============================================================
// Team / About
// ============================================================

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo { ${imageFragment} },
    socialLinks[]{ _key, platform, url }
  }
`)

// ============================================================
// Legal
// ============================================================

export const LEGAL_PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    body,
    lastUpdated,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, ""),
      "image": seo.image { ${imageFragment} },
      "noIndex": seo.noIndex == true
    }
  }
`)

// ============================================================
// Search
// ============================================================

export const SEARCH_QUERY = defineQuery(`
  *[
    _type in ["blogPost", "caseStudy", "feature", "legalPage"] &&
    defined(slug.current) &&
    (title match $searchTerm + "*" || excerpt match $searchTerm + "*" || description match $searchTerm + "*")
  ] | order(_type, title asc) [0...20] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, description, ""),
    "href": select(
      _type == "blogPost" => "/blog/" + slug.current,
      _type == "caseStudy" => "/case-studies/" + slug.current,
      _type == "feature" => "/features",
      _type == "legalPage" => "/legal/" + slug.current,
      "/" + slug.current
    )
  }
`)

// ============================================================
// Sitemap
// ============================================================

export const SITEMAP_QUERY = defineQuery(`
  *[
    _type in ["blogPost", "caseStudy", "legalPage"] &&
    defined(slug.current) &&
    !(seo.noIndex == true)
  ] {
    "href": select(
      _type == "blogPost" => "/blog/" + slug.current,
      _type == "caseStudy" => "/case-studies/" + slug.current,
      _type == "legalPage" => "/legal/" + slug.current,
      "/" + slug.current
    ),
    _updatedAt
  }
`)
