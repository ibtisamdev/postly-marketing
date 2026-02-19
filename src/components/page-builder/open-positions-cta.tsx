import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { stegaClean } from '@sanity/client/stega'

type OpenPositionsCtaProps = {
  title: string | null
  description?: string | null
  link?: {
    label?: string | null
    linkType?: string | null
    href?: string | null
    url?: string | null
  } | null
  enabled?: boolean | null
}

export function OpenPositionsCta({
  title,
  description,
  link,
  enabled,
}: OpenPositionsCtaProps) {
  if (enabled === false) return null

  const linkType = stegaClean(link?.linkType)
  const destination = linkType === 'external' ? link?.url : link?.href

  return (
    <Section className="text-center">
      <div className="mx-auto max-w-2xl">
        {title && (
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-4 text-lg text-muted">{description}</p>
        )}
        {link?.label && destination && (
          <div className="mt-8">
            <Button href={destination} size="lg">
              {link.label}
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}
