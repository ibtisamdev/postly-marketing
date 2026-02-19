import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const sectionHero = defineType({
  name: 'sectionHero',
  title: 'Hero',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the main heading',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cta1',
      title: 'Primary CTA',
      type: 'link',
    }),
    defineField({
      name: 'cta2',
      title: 'Secondary CTA',
      type: 'link',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'string',
      description: 'Small text below CTAs (e.g. "No credit card required")',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Hero',
        media: RocketIcon,
      }
    },
  },
})
