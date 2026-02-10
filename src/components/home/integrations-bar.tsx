import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { SanityImage } from '@/components/ui/sanity-image'

type Integration = {
  _id: string
  name: string | null
  logo: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: { width?: number; height?: number }
      }
    }
    alt?: string
    hotspot?: { x?: number; y?: number }
    crop?: {
      top?: number
      bottom?: number
      left?: number
      right?: number
    }
  } | null
  description: string | null
  url: string | null
  category: string | null
}

export function IntegrationsBar({
  integrations,
}: {
  integrations: Integration[]
}) {
  if (!integrations.length) return null

  return (
    <Section>
      <Heading
        eyebrow="Integrations"
        title="Works with your favorite platforms"
        description="Connect all the social networks and tools you already use."
      />
      <div className="flex flex-wrap items-center justify-center gap-8">
        {integrations.map((integration) => (
          <div
            key={integration._id}
            className="flex flex-col items-center gap-2"
          >
            {integration.logo ? (
              <SanityImage
                value={integration.logo}
                width={48}
                height={48}
                className="h-12 w-12 object-contain grayscale transition-all hover:grayscale-0"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary-600">
                {integration.name?.charAt(0)}
              </div>
            )}
            <span className="text-xs text-muted">{integration.name}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
