import { defineField, defineType } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons'

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
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
      description: 'e.g. 150%, 3x, $2M',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g. TrendingUp, Users)',
    }),
  ],
  preview: {
    select: { label: 'label', value: 'value' },
    prepare({ label, value }) {
      return {
        title: `${value} — ${label}`,
      }
    },
  },
})
