import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title for search engines',
      validation: (rule) =>
        rule.max(60).warning('Keep under 60 characters for best results'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for search engine results',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Keep under 160 characters for best results'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: '1200x630 recommended',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
