import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { PRICING_TIERS_QUERY, PRICING_FAQS_QUERY } from '@/sanity/lib/queries'
import { PricingPageClient } from '@/components/pricing/pricing-page-client'

export const metadata: Metadata = {
  title: 'Pricing — Postly',
  description:
    'Simple, transparent pricing for teams of every size. Start your 14-day free trial today.',
}

export default async function PricingPage() {
  const [tiersRes, faqsRes] = await Promise.all([
    sanityFetch({ query: PRICING_TIERS_QUERY }),
    sanityFetch({ query: PRICING_FAQS_QUERY }),
  ])

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const tiers = (tiersRes.data ?? []) as any[]
  const faqs = (faqsRes.data ?? []) as any[]
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return <PricingPageClient tiers={tiers} faqs={faqs} />
}
