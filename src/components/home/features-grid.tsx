import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { getIcon } from '@/lib/icon-map'
import { Sparkles } from 'lucide-react'

type Feature = {
  _id: string
  title: string | null
  description: string | null
  icon: string | null
  slug: string | null
}

type FeaturesGridProps = {
  eyebrow?: string | null
  title: string | null
  description?: string | null
  features: Feature[]
}

export function FeaturesGrid({
  eyebrow,
  title,
  description,
  features,
}: FeaturesGridProps) {
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
        {features.map((feature) => {
          const Icon = getIcon(feature.icon) ?? Sparkles
          return (
            <div key={feature._id} className="group">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
