import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
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
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      group: 'general',
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
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      group: 'footer',
      description: 'Dynamic footer columns — add as many as needed',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          title: 'Column',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [defineArrayMember({ type: 'link' })],
            }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerLinks1',
      title: 'Footer Links — Column 1 (Deprecated)',
      type: 'object',
      deprecated: { reason: 'Use footerColumns instead' },
      hidden: ({ value }: { value: unknown }) => value === undefined,
      readOnly: true,
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
        }),
      ],
    }),
    defineField({
      name: 'footerLinks2',
      title: 'Footer Links — Column 2 (Deprecated)',
      type: 'object',
      deprecated: { reason: 'Use footerColumns instead' },
      hidden: ({ value }: { value: unknown }) => value === undefined,
      readOnly: true,
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
        }),
      ],
    }),
    defineField({
      name: 'footerLinks3',
      title: 'Footer Links — Column 3 (Deprecated)',
      type: 'object',
      deprecated: { reason: 'Use footerColumns instead' },
      hidden: ({ value }: { value: unknown }) => value === undefined,
      readOnly: true,
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
        }),
      ],
    }),
    defineField({
      name: 'footerLinks4',
      title: 'Footer Links — Column 4 (Deprecated)',
      type: 'object',
      deprecated: { reason: 'Use footerColumns instead' },
      hidden: ({ value }: { value: unknown }) => value === undefined,
      readOnly: true,
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      group: 'general',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enabled',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description: 'Fallback SEO settings for pages without their own',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
