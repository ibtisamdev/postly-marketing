import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export const pteCallout = defineType({
  name: 'pteCallout',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Tip', value: 'tip' },
          { title: 'Note', value: 'note' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { tone: 'tone', body: 'body' },
    prepare({ tone, body }) {
      return {
        title: `${(tone || 'info').charAt(0).toUpperCase() + (tone || 'info').slice(1)} Callout`,
        subtitle: body,
      }
    },
  },
})
