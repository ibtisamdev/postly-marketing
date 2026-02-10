import { defineField, defineType, defineArrayMember } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price',
      type: 'number',
      description: 'Price in USD per month. Use 0 for free tier.',
    }),
    defineField({
      name: 'annualPrice',
      title: 'Annual Price',
      type: 'number',
      description: 'Price in USD per month when billed annually',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({ type: 'pricingFeature' })],
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      description: 'Visually emphasize this tier (e.g. "Most Popular")',
      initialValue: false,
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'link',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      monthlyPrice: 'monthlyPrice',
    },
    prepare({ title, monthlyPrice }) {
      return {
        title,
        subtitle:
          monthlyPrice === 0
            ? 'Free'
            : monthlyPrice
              ? `$${monthlyPrice}/mo`
              : '',
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
