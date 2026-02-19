import { Section } from '@/components/ui/section'

type MissionProps = {
  eyebrow?: string | null
  title: string | null
  body?: string | null
}

export function Mission({ eyebrow, title, body }: MissionProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
        )}
        {body && <p className="mt-6 text-lg text-muted">{body}</p>}
      </div>
    </Section>
  )
}
