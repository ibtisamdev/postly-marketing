import { defineField, defineType, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionPainPoints' }),
        defineArrayMember({ type: 'sectionFeaturesGrid' }),
        defineArrayMember({ type: 'sectionStatsBar' }),
        defineArrayMember({ type: 'sectionTestimonials' }),
        defineArrayMember({ type: 'sectionIntegrations' }),
        defineArrayMember({ type: 'sectionCta' }),
        defineArrayMember({ type: 'sectionMission' }),
        defineArrayMember({ type: 'sectionValues' }),
        defineArrayMember({ type: 'sectionTeamGrid' }),
        defineArrayMember({ type: 'sectionContactForm' }),
        defineArrayMember({ type: 'sectionFaq' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionOpenPositions' }),
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (type) => `/block-previews/${type}.png`,
            },
          ],
        },
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : '',
      }
    },
  },
})
