'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type FaqSectionProps = {
  eyebrow?: string | null
  title: string | null
  description?: string | null
  faqs?: Array<{
    _key: string
    question: string | null
    answer: string | null
  }> | null
}

export function FaqSection({ eyebrow, title, description, faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs?.length) return null

  return (
    <Section>
      {title && (
        <Heading
          eyebrow={eyebrow ?? undefined}
          title={title}
          description={description ?? undefined}
        />
      )}
      <div className="mx-auto max-w-3xl divide-y divide-border">
        {faqs.map((faq, index) => (
          <div key={faq._key} className="py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-base font-medium text-foreground">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  'ml-4 h-5 w-5 shrink-0 text-muted transition-transform',
                  openIndex === index && 'rotate-180',
                )}
              />
            </button>
            {openIndex === index && (
              <p className="mt-3 text-sm text-muted">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
