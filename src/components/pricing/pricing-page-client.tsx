'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { PricingToggle } from './pricing-toggle'
import { PricingCard } from './pricing-card'
import { PricingFAQ } from './pricing-faq'

type Tier = {
  _id: string
  name: string | null
  monthlyPrice: number | null
  annualPrice: number | null
  description: string | null
  features:
    | { _key: string; text: string | null; included: boolean | null }[]
    | null
  highlighted: boolean | null
  cta: {
    label: string | null
    linkType: string | null
    href: string | null
    url: string | null
  } | null
  order: number | null
}

type FAQ = {
  _id: string
  question: string | null
  answerText: string | null
}

export function PricingPageClient({
  tiers,
  faqs,
}: {
  tiers: Tier[]
  faqs: FAQ[]
}) {
  const [annual, setAnnual] = useState(true)

  return (
    <>
      <Section>
        <Heading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          description="Choose the plan that fits your team. No hidden fees."
        />
        <PricingToggle
          annual={annual}
          onToggle={() => setAnnual(!annual)}
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard key={tier._id} {...tier} annual={annual} />
          ))}
        </div>
      </Section>
      <PricingFAQ faqs={faqs} />
    </>
  )
}
