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

// Section types (Page Builder)
import { sectionHero } from './sections/section-hero'
import { sectionPainPoints } from './sections/section-pain-points'
import { sectionFeaturesGrid } from './sections/section-features-grid'
import { sectionStatsBar } from './sections/section-stats-bar'
import { sectionTestimonials } from './sections/section-testimonials'
import { sectionIntegrations } from './sections/section-integrations'
import { sectionCta } from './sections/section-cta'
import { sectionMission } from './sections/section-mission'
import { sectionValues } from './sections/section-values'
import { sectionTeamGrid } from './sections/section-team-grid'
import { sectionContactForm } from './sections/section-contact-form'
import { sectionFaq } from './sections/section-faq'
import { sectionRichText } from './sections/section-rich-text'
import { sectionOpenPositions } from './sections/section-open-positions'

// Document types
import { page } from './documents/page'
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
    // Sections (Page Builder)
    sectionHero,
    sectionPainPoints,
    sectionFeaturesGrid,
    sectionStatsBar,
    sectionTestimonials,
    sectionIntegrations,
    sectionCta,
    sectionMission,
    sectionValues,
    sectionTeamGrid,
    sectionContactForm,
    sectionFaq,
    sectionRichText,
    sectionOpenPositions,
    // Documents
    page,
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
