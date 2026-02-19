import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Card, CardContent } from '@/components/ui/card'
import { getIcon } from '@/lib/icon-map'

type PainPointsProps = {
  eyebrow?: string | null
  title: string | null
  description?: string | null
  painPoints?: Array<{
    _key: string
    icon?: string | null
    title: string | null
    description?: string | null
  }> | null
}

export function PainPoints({
  eyebrow,
  title,
  description,
  painPoints,
}: PainPointsProps) {
  if (!painPoints?.length) return null

  return (
    <Section>
      {title && (
        <Heading
          eyebrow={eyebrow ?? undefined}
          title={title}
          description={description ?? undefined}
        />
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {painPoints.map((point) => {
          const Icon = getIcon(point.icon)
          return (
            <Card key={point._key} className="text-center">
              <CardContent className="pt-6">
                {Icon && (
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {point.title}
                </h3>
                {point.description && (
                  <p className="text-sm text-muted">{point.description}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
