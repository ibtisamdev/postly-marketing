import { defineField, defineType } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons'

export const sectionStatsBar = defineType({
  name: 'sectionStatsBar',
  title: 'Stats Bar',
  type: 'object',
  icon: TrendUpwardIcon,
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Stats Bar',
        subtitle: 'Stats Bar',
        media: TrendUpwardIcon,
      }
    },
  },
})
