import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const sectionOpenPositions = defineType({
  name: 'sectionOpenPositions',
  title: 'Open Positions',
  type: 'object',
  icon: CaseIcon,
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
      name: 'link',
      title: 'Careers Link',
      type: 'link',
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle visibility of this section',
    }),
  ],
  preview: {
    select: { title: 'title', enabled: 'enabled' },
    prepare({ title, enabled }) {
      return {
        title: title || 'Untitled',
        subtitle: `Open Positions${enabled === false ? ' (Hidden)' : ''}`,
        media: CaseIcon,
      }
    },
  },
})
