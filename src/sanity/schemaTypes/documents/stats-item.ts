import { defineField, defineType } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons'

export const statsItem = defineType({
  name: 'statsItem',
  title: 'Stats Item',
  type: 'document',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. 10M+, 50K+, 99.9%',
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
          { title: 'TrendingUp', value: 'TrendingUp' },
          { title: 'Clock', value: 'Clock' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Target', value: 'Target' },
          { title: 'Eye', value: 'Eye' },
          { title: 'Rocket', value: 'Rocket' },
          { title: 'Star', value: 'Star' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { value: 'value', label: 'label' },
    prepare({ value, label }) {
      return {
        title: `${value} — ${label}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
