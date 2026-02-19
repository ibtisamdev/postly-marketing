import { defineField, defineType } from 'sanity'
import { PlugIcon } from '@sanity/icons'

export const sectionIntegrations = defineType({
  name: 'sectionIntegrations',
  title: 'Integrations',
  type: 'object',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
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
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Integrations',
        media: PlugIcon,
      }
    },
  },
})
