import { defineField, defineType, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const changelogEntry = defineType({
  name: 'changelogEntry',
  title: 'Changelog Entry',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'e.g. v2.1.0',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'changeType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Feature', value: 'feature' },
          { title: 'Improvement', value: 'improvement' },
          { title: 'Fix', value: 'fix' },
          { title: 'Breaking Change', value: 'breaking' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
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
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https'],
                      }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'pteImage' }),
        defineArrayMember({ type: 'pteCode' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      date: 'date',
      changeType: 'changeType',
    },
    prepare({ title, version, date, changeType }) {
      return {
        title,
        subtitle: [version, changeType, date].filter(Boolean).join(' · '),
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
