import { defineField, defineType } from 'sanity'
import { CheckmarkIcon } from '@sanity/icons'

export const pricingFeature = defineType({
  name: 'pricingFeature',
  title: 'Pricing Feature',
  type: 'object',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Feature Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'included',
      title: 'Included',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { text: 'text', included: 'included' },
    prepare({ text, included }) {
      return {
        title: text || 'Untitled feature',
        subtitle: included !== false ? 'Included' : 'Not included',
      }
    },
  },
})
