import { defineField, defineType, defineArrayMember } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name — browse at lucide.dev/icons',
      options: {
        list: [
          { title: 'Calendar', value: 'Calendar' },
          { title: 'BarChart3', value: 'BarChart3' },
          { title: 'Users', value: 'Users' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Globe', value: 'Globe' },
          { title: 'Layout', value: 'Layout' },
          { title: 'Bell', value: 'Bell' },
          { title: 'Shield', value: 'Shield' },
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'TrendingUp', value: 'TrendingUp' },
          { title: 'Clock', value: 'Clock' },
          { title: 'Shuffle', value: 'Shuffle' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Lightbulb', value: 'Lightbulb' },
          { title: 'Target', value: 'Target' },
          { title: 'Eye', value: 'Eye' },
          { title: 'Lock', value: 'Lock' },
          { title: 'Rocket', value: 'Rocket' },
          { title: 'Settings', value: 'Settings' },
          { title: 'Share2', value: 'Share2' },
          { title: 'Smartphone', value: 'Smartphone' },
        ],
      },
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        }),
        defineArrayMember({ type: 'pteImage' }),
      ],
    }),
    defineField({
      name: 'screenshot',
      title: 'Screenshot',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
