'use client'

import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { AccordionItem } from '@/components/ui/accordion'

type FAQ = {
  _id: string
  question: string | null
  answerText: string | null
}

export function PricingFAQ({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null

  return (
    <Section>
      <Heading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about our pricing."
      />
      <div className="mx-auto max-w-2xl">
        {faqs.map((faq) => (
          <AccordionItem key={faq._id} title={faq.question ?? ''}>
            {faq.answerText}
          </AccordionItem>
        ))}
      </div>
    </Section>
  )
}
