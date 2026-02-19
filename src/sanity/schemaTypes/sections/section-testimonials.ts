import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const sectionTestimonials = defineType({
  name: 'sectionTestimonials',
  title: 'Testimonials',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      description: 'Max number of testimonials to display',
      initialValue: 6,
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Testimonials',
        media: StarIcon,
      }
    },
  },
})
