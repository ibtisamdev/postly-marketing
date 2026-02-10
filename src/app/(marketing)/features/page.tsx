import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { FEATURES_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { FeatureCard } from '@/components/features/feature-card'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: 'Features — Postly',
  description:
    'Explore all the powerful features that make Postly the best social media management platform for growing teams.',
}

export default async function FeaturesPage() {
  const { data: features } = await sanityFetch({ query: FEATURES_QUERY })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featureList = (features ?? []) as any[]

  return (
    <>
      <Section>
        <Heading
          eyebrow="Features"
          title="Powerful tools for modern teams"
          description="Everything you need to plan, publish, and measure your social media strategy."
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {featureList.map((feature) => (
            <FeatureCard
              key={feature._id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              screenshot={feature.screenshot}
            />
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  )
}
