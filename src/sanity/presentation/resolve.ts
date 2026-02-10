import {
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    blogPost: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/${doc?.slug}`,
          },
          { title: 'Blog', href: '/blog' },
        ],
      }),
    }),
    caseStudy: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/case-studies/${doc?.slug}`,
          },
          { title: 'Case Studies', href: '/case-studies' },
        ],
      }),
    }),
    legalPage: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/legal/${doc?.slug}`,
          },
        ],
      }),
    }),
    feature: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Features', href: '/features' }],
      }),
    }),
    pricingTier: defineLocations({
      select: { title: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Pricing', href: '/pricing' }],
      }),
    }),
    pricingFAQ: defineLocations({
      select: { title: 'question' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Pricing', href: '/pricing' }],
      }),
    }),
    teamMember: defineLocations({
      select: { title: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'About', href: '/about' }],
      }),
    }),
    testimonial: defineLocations({
      select: { title: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Home', href: '/' }],
      }),
    }),
    changelogEntry: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Changelog', href: '/changelog' },
        ],
      }),
    }),
    siteSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Home', href: '/' }],
      }),
    }),
  },
}
