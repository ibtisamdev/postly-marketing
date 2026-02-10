import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
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
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'footerLinks1',
      title: 'Footer Links — Column 1',
      type: 'object',
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
      title: 'Footer Links — Column 2',
      type: 'object',
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
      title: 'Footer Links — Column 3',
      type: 'object',
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
      title: 'Footer Links — Column 4',
      type: 'object',
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
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
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
      description: 'Fallback SEO settings for pages without their own',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
