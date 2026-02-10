import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {
  HOMEPAGE_FEATURES_QUERY,
  HOMEPAGE_TESTIMONIALS_QUERY,
  HOMEPAGE_INTEGRATIONS_QUERY,
  HOMEPAGE_STATS_QUERY,
} from '@/sanity/lib/queries'
import { Hero } from '@/components/home/hero'
import { PainPoints } from '@/components/home/pain-points'
import { FeaturesGrid } from '@/components/home/features-grid'
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel'
import { IntegrationsBar } from '@/components/home/integrations-bar'
import { StatsBar } from '@/components/home/stats-bar'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: 'Postly — Schedule, Publish & Grow Your Social Media',
  description:
    'Postly helps teams plan, schedule, and analyze their social media content across every platform from one powerful dashboard.',
}

export default async function HomePage() {
  const [featuresRes, testimonialsRes, integrationsRes, statsRes] =
    await Promise.all([
      sanityFetch({ query: HOMEPAGE_FEATURES_QUERY }),
      sanityFetch({ query: HOMEPAGE_TESTIMONIALS_QUERY }),
      sanityFetch({ query: HOMEPAGE_INTEGRATIONS_QUERY }),
      sanityFetch({ query: HOMEPAGE_STATS_QUERY }),
    ])

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const features = (featuresRes.data ?? []) as any[]
  const testimonials = (testimonialsRes.data ?? []) as any[]
  const integrations = (integrationsRes.data ?? []) as any[]
  const stats = (statsRes.data ?? []) as any[]
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <>
      <Hero />
      <PainPoints />
      <FeaturesGrid features={features} />
      <StatsBar stats={stats} />
      <TestimonialsCarousel testimonials={testimonials} />
      <IntegrationsBar integrations={integrations} />
      <FinalCta />
    </>
  )
}
