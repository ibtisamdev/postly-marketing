import { defineField, defineType } from 'sanity'
import { LaunchIcon } from '@sanity/icons'

export const sectionCta = defineType({
  name: 'sectionCta',
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'link',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'link',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Call to Action',
        media: LaunchIcon,
      }
    },
  },
})
