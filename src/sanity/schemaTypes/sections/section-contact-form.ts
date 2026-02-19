import { defineField, defineType, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const sectionContactForm = defineType({
  name: 'sectionContactForm',
  title: 'Contact Form',
  type: 'object',
  icon: EnvelopeIcon,
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
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide icon name (e.g. Mail, MapPin, Clock)',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
    defineField({
      name: 'formLabels',
      title: 'Form Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'nameLabel',
          title: 'Name Label',
          type: 'string',
          initialValue: 'Name',
        }),
        defineField({
          name: 'namePlaceholder',
          title: 'Name Placeholder',
          type: 'string',
          initialValue: 'Your name',
        }),
        defineField({
          name: 'emailLabel',
          title: 'Email Label',
          type: 'string',
          initialValue: 'Email',
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'you@company.com',
        }),
        defineField({
          name: 'companyLabel',
          title: 'Company Label',
          type: 'string',
          initialValue: 'Company (optional)',
        }),
        defineField({
          name: 'companyPlaceholder',
          title: 'Company Placeholder',
          type: 'string',
          initialValue: 'Your company',
        }),
        defineField({
          name: 'messageLabel',
          title: 'Message Label',
          type: 'string',
          initialValue: 'Message',
        }),
        defineField({
          name: 'messagePlaceholder',
          title: 'Message Placeholder',
          type: 'string',
          initialValue: 'How can we help?',
        }),
        defineField({
          name: 'submitLabel',
          title: 'Submit Button Label',
          type: 'string',
          initialValue: 'Send Message',
        }),
        defineField({
          name: 'submittingLabel',
          title: 'Submitting Button Label',
          type: 'string',
          initialValue: 'Sending...',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
          initialValue: 'Message sent! We will get back to you soon.',
        }),
      ],
    }),
    defineField({
      name: 'topicOptions',
      title: 'Topic Options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Optional dropdown for topic selection',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Contact Form',
        media: EnvelopeIcon,
      }
    },
  },
})
