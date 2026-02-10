import { defineField, defineType } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons'

export const pteCode = defineType({
  name: 'pteCode',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Other', value: 'text' },
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display above the code block',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { language: 'language', filename: 'filename', code: 'code' },
    prepare({ language, filename, code }) {
      return {
        title: filename || `${language || 'Code'} block`,
        subtitle: code ? code.slice(0, 50) : '',
      }
    },
  },
})
