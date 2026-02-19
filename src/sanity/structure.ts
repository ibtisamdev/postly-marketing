import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  DocumentTextIcon,
  PresentationIcon,
  CalendarIcon,
  ThLargeIcon,
  BulbOutlineIcon,
  UsersIcon,
  DocumentIcon,
} from '@sanity/icons'

const LISTED_TYPES = [
  'siteSettings',
  'page',
  'blogPost',
  'author',
  'category',
  'caseStudy',
  'changelogEntry',
  'pricingTier',
  'pricingFAQ',
  'feature',
  'teamMember',
  'testimonial',
  'integration',
  'legalPage',
  'statsItem',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.divider(),

      // Pages (Page Builder)
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('Home')
                    .schemaType('page')
                    .filter('_type == "page" && slug.current == "home"'),
                ),
              S.listItem()
                .title('About')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('About')
                    .schemaType('page')
                    .filter('_type == "page" && slug.current == "about"'),
                ),
              S.listItem()
                .title('Contact')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('Contact')
                    .schemaType('page')
                    .filter('_type == "page" && slug.current == "contact"'),
                ),
              S.divider(),
              S.documentTypeListItem('page').title('All Pages'),
            ]),
        ),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('blogPost').title('Posts'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('category').title('Categories'),
            ]),
        ),

      // Case Studies
      S.documentTypeListItem('caseStudy')
        .title('Case Studies')
        .icon(PresentationIcon),

      // Changelog
      S.documentTypeListItem('changelogEntry')
        .title('Changelog')
        .icon(CalendarIcon),

      S.divider(),

      // Marketing
      S.listItem()
        .title('Marketing')
        .icon(BulbOutlineIcon)
        .child(
          S.list()
            .title('Marketing')
            .items([
              S.documentTypeListItem('feature').title('Features'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('integration').title('Integrations'),
              S.documentTypeListItem('statsItem').title('Stats'),
            ]),
        ),

      // Pricing
      S.listItem()
        .title('Pricing')
        .icon(ThLargeIcon)
        .child(
          S.list()
            .title('Pricing')
            .items([
              S.documentTypeListItem('pricingTier').title('Tiers'),
              S.documentTypeListItem('pricingFAQ').title('FAQs'),
            ]),
        ),

      S.divider(),

      // Team
      S.documentTypeListItem('teamMember')
        .title('Team')
        .icon(UsersIcon),

      // Legal
      S.documentTypeListItem('legalPage')
        .title('Legal Pages')
        .icon(DocumentIcon),

      // Remaining types not explicitly listed
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return id !== undefined && !LISTED_TYPES.includes(id)
      }),
    ])
