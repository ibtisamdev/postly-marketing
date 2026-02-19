import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { getIcon } from '@/lib/icon-map'

type ValuesProps = {
  eyebrow?: string | null
  title: string | null
  description?: string | null
  values?: Array<{
    _key: string
    icon?: string | null
    title: string | null
    description?: string | null
  }> | null
}

export function Values({
  eyebrow,
  title,
  description,
  values,
}: ValuesProps) {
  if (!values?.length) return null

  return (
    <Section>
      {title && (
        <Heading
          eyebrow={eyebrow ?? undefined}
          title={title}
          description={description ?? undefined}
        />
      )}
      <div className="grid gap-8 sm:grid-cols-2">
        {values.map((v) => {
          const Icon = getIcon(v.icon)
          return (
            <div key={v._key} className="flex gap-4">
              {Icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {v.title}
                </h3>
                {v.description && (
                  <p className="mt-1 text-sm text-muted">{v.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
