import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'

type PricingFeature = {
  _key: string
  text: string | null
  included: boolean | null
}

type PricingCardProps = {
  name: string | null
  monthlyPrice: number | null
  annualPrice: number | null
  description: string | null
  features: PricingFeature[] | null
  highlighted: boolean | null
  cta: {
    label: string | null
    linkType: string | null
    href: string | null
    url: string | null
  } | null
  annual: boolean
}

export function PricingCard({
  name,
  monthlyPrice,
  annualPrice,
  description,
  features,
  highlighted,
  cta,
  annual,
}: PricingCardProps) {
  const price = annual ? annualPrice : monthlyPrice
  const ctaLinkType = cta?.linkType ? stegaClean(cta.linkType) : 'internal'
  const ctaHref =
    ctaLinkType === 'external' ? (cta?.url ?? '#') : (cta?.href ?? '#')

  return (
    <Card
      className={cn(
        'flex flex-col',
        highlighted && 'relative border-primary-600 shadow-lg',
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </div>
      )}
      <CardHeader>
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold text-foreground">
            {price != null ? `$${price}` : 'Custom'}
          </span>
          {price != null && (
            <span className="text-sm text-muted">/month</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {(features ?? []).map((f) => (
            <li key={f._key} className="flex items-start gap-2 text-sm">
              {f.included ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
              )}
              <span className={f.included ? 'text-foreground' : 'text-muted'}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          href={ctaHref}
          variant={highlighted ? 'primary' : 'outline'}
          className="w-full"
        >
          {cta?.label ?? 'Get Started'}
        </Button>
      </CardFooter>
    </Card>
  )
}
