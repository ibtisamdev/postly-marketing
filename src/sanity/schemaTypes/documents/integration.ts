import { defineField, defineType } from 'sanity'
import { PlugIcon } from '@sanity/icons'

export const integration = defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Social Media', value: 'social' },
          { title: 'Productivity', value: 'productivity' },
          { title: 'Design', value: 'design' },
          { title: 'Analytics', value: 'analytics' },
          { title: 'Communication', value: 'communication' },
          { title: 'Storage', value: 'storage' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
  },
})
