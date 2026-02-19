import { defineField, defineType, defineArrayMember } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export const sectionRichText = defineType({
  name: 'sectionRichText',
  title: 'Rich Text',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
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
                      rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: 'pteImage' }),
        defineArrayMember({ type: 'pteCallout' }),
        defineArrayMember({ type: 'pteCode' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rich Text Block',
        subtitle: 'Rich Text',
        media: BlockContentIcon,
      }
    },
  },
})
