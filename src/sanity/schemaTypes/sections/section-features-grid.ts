import { defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const sectionFeaturesGrid = defineType({
  name: 'sectionFeaturesGrid',
  title: 'Features Grid',
  type: 'object',
  icon: BulbOutlineIcon,
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
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      description: 'Max number of features to display',
      initialValue: 9,
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Features Grid',
        media: BulbOutlineIcon,
      }
    },
  },
})
