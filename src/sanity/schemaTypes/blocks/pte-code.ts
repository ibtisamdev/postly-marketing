import { defineField, defineType } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons'

export const pteCode = defineType({
  name: 'pteCode',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'JSX', value: 'jsx' },
          { title: 'TSX', value: 'tsx' },
          { title: 'GraphQL', value: 'graphql' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Plain Text', value: 'text' },
        ],
        withFilename: true,
      },
    }),
  ],
  preview: {
    select: { code: 'code' },
    prepare({ code }: { code?: { language?: string; filename?: string; code?: string } }) {
      return {
        title: code?.filename || `${code?.language || 'Code'} block`,
        subtitle: code?.code ? code.code.slice(0, 50) : '',
      }
    },
  },
})
