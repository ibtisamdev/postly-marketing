import { type SchemaTypeDefinition } from 'sanity'

// Object types
import { seo } from './objects/seo'
import { link } from './objects/link'
import { socialLink } from './objects/social-link'
import { metric } from './objects/metric'
import { pricingFeature } from './objects/pricing-feature'

// Block types (Portable Text)
import { pteImage } from './blocks/pte-image'
import { pteCallout } from './blocks/pte-callout'
import { pteCode } from './blocks/pte-code'

// Document types
import { blogPost } from './documents/blog-post'
import { author } from './documents/author'
import { category } from './documents/category'
import { caseStudy } from './documents/case-study'
import { changelogEntry } from './documents/changelog-entry'
import { pricingTier } from './documents/pricing-tier'
import { pricingFAQ } from './documents/pricing-faq'
import { feature } from './documents/feature'
import { teamMember } from './documents/team-member'
import { testimonial } from './documents/testimonial'
import { integration } from './documents/integration'
import { legalPage } from './documents/legal-page'
import { siteSettings } from './documents/site-settings'
import { statsItem } from './documents/stats-item'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    link,
    socialLink,
    metric,
    pricingFeature,
    // Blocks
    pteImage,
    pteCallout,
    pteCode,
    // Documents
    blogPost,
    author,
    category,
    caseStudy,
    changelogEntry,
    pricingTier,
    pricingFAQ,
    feature,
    teamMember,
    testimonial,
    integration,
    legalPage,
    siteSettings,
    statsItem,
  ],
}
