import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { stegaClean } from '@sanity/client/stega'

type LinkValue = {
  label?: string | null
  linkType?: string | null
  href?: string | null
  url?: string | null
} | null

export type FinalCtaProps = {
  title?: string | null
  description?: string | null
  ctaPrimary?: LinkValue
  ctaSecondary?: LinkValue
}

function getHref(link?: LinkValue): string | undefined {
  if (!link) return undefined
  const linkType = stegaClean(link.linkType)
  return (linkType === 'external' ? link.url : link.href) ?? undefined
}

export function FinalCta({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}: FinalCtaProps) {
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
        {(ctaPrimary?.label || ctaSecondary?.label) && (
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {ctaPrimary?.label && (
              <Button href={getHref(ctaPrimary)} size="lg">
                {ctaPrimary.label}
              </Button>
            )}
            {ctaSecondary?.label && (
              <Button
                href={getHref(ctaSecondary)}
                variant="outline"
                size="lg"
              >
                {ctaSecondary.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}
