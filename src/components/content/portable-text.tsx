import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from '@portabletext/react'
import { SanityImage } from '@/components/ui/sanity-image'
import { cn } from '@/lib/utils'
import { Info, AlertTriangle, Lightbulb, StickyNote } from 'lucide-react'

const toneConfig: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>
    className: string
  }
> = {
  info: { icon: Info, className: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200' },
  warning: { icon: AlertTriangle, className: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200' },
  tip: { icon: Lightbulb, className: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/50 dark:text-green-200' },
  note: { icon: StickyNote, className: 'border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200' },
}

const components: PortableTextComponents = {
  types: {
    pteImage: ({ value }: { value: { image?: Record<string, unknown>; caption?: string } }) => (
      <figure className="my-8">
        <SanityImage
          value={value.image as Parameters<typeof SanityImage>[0]['value']}
          width={800}
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-muted">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    pteCallout: ({ value }: { value: { tone?: string; body?: string } }) => {
      const tone = toneConfig[value.tone || 'note'] || toneConfig.note
      const Icon = tone.icon
      return (
        <aside
          className={cn(
            'my-6 flex gap-3 rounded-lg border p-4',
            tone.className,
          )}
        >
          <Icon className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">{value.body}</p>
        </aside>
      )
    },
    pteCode: ({ value }: { value: { language?: string; filename?: string; code?: string } }) => (
      <div className="my-6 overflow-hidden rounded-lg border border-border">
        {(value.filename || value.language) && (
          <div className="flex items-center gap-2 border-b border-border bg-gray-50 px-4 py-2 dark:bg-gray-900">
            {value.filename && (
              <span className="text-xs font-medium text-foreground">
                {value.filename}
              </span>
            )}
            {value.language && (
              <span className="ml-auto text-xs text-muted">
                {value.language}
              </span>
            )}
          </div>
        )}
        <pre className="overflow-x-auto bg-gray-950 p-4 text-sm text-gray-100">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        className="text-primary-600 underline decoration-primary-300 underline-offset-2 hover:decoration-primary-600"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono dark:bg-gray-800">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mb-2 mt-6 text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-base leading-relaxed text-muted">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-primary-300 pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-muted">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
}

type PortableTextProps = {
  value: Parameters<typeof PortableTextReact>[0]['value']
  className?: string
}

export function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null
  return (
    <div className={cn('portable-text', className)}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}
