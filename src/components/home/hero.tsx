import { Button } from '@/components/ui/button'
import { stegaClean } from '@sanity/client/stega'

type LinkValue = {
  label?: string | null
  linkType?: string | null
  href?: string | null
  url?: string | null
} | null

type HeroProps = {
  eyebrow?: string | null
  title: string | null
  subtitle?: string | null
  cta1?: LinkValue
  cta2?: LinkValue
  disclaimer?: string | null
  level?: 'h1' | 'h2'
}

function getHref(link?: LinkValue): string | undefined {
  if (!link) return undefined
  const linkType = stegaClean(link.linkType)
  return (linkType === 'external' ? link.url : link.href) ?? undefined
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  cta1,
  cta2,
  disclaimer,
  level = 'h1',
}: HeroProps) {
  const Tag = level

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20" />
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600">
            {eyebrow}
          </p>
        )}
        <Tag className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </Tag>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            {subtitle}
          </p>
        )}
        {(cta1?.label || cta2?.label) && (
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {cta1?.label && (
              <Button href={getHref(cta1)} size="lg">
                {cta1.label}
              </Button>
            )}
            {cta2?.label && (
              <Button href={getHref(cta2)} variant="outline" size="lg">
                {cta2.label}
              </Button>
            )}
          </div>
        )}
        {disclaimer && (
          <p className="mt-4 text-sm text-muted">{disclaimer}</p>
        )}
      </div>
    </section>
  )
}
