import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { CaseStudyCard } from '@/components/case-studies/case-study-card'

export const metadata: Metadata = {
  title: 'Case Studies — Postly',
  description:
    'See how real teams use Postly to grow their social media presence and save time.',
}

export default async function CaseStudiesPage() {
  const { data: studies } = await sanityFetch({ query: CASE_STUDIES_QUERY })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const studyList = (studies ?? []) as any[]

  return (
    <Section>
      <Heading
        eyebrow="Case Studies"
        title="Real results from real teams"
        description="Discover how companies use Postly to transform their social media strategy."
      />
      {studyList.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2">
          {studyList.map((study) => (
            <CaseStudyCard
              key={study._id}
              title={study.title}
              slug={study.slug}
              companyName={study.companyName}
              industry={study.industry}
              featured={study.featured}
              coverImage={study.coverImage}
              logo={study.logo}
              metrics={study.metrics}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">
          No case studies yet. Check back soon!
        </p>
      )}
    </Section>
  )
}
