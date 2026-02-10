import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { SanityImage } from '@/components/ui/sanity-image'
import { Badge } from '@/components/ui/badge'
import { PortableText } from '@/components/content/portable-text'
import { Quote } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!data) return {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const study = data as any
  return {
    title: `${study.seo?.title || study.title} — Postly Case Studies`,
    description: study.seo?.description || '',
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!data) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const study = data as any

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            {study.logo && (
              <SanityImage
                value={study.logo}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            )}
            <div>
              <p className="font-medium text-foreground">
                {study.companyName}
              </p>
              {study.industry && (
                <Badge variant="outline">{study.industry}</Badge>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {study.title}
          </h1>
          {study.coverImage && (
            <SanityImage
              value={study.coverImage}
              width={1200}
              className="mt-8 rounded-xl"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          )}
        </header>

        {study.metrics && study.metrics.length > 0 && (
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {study.metrics.map((m: { _key: string; value: string; label: string }) => (
              <div
                key={m._key}
                className="rounded-lg bg-primary-50 p-4 text-center dark:bg-primary-950/20"
              >
                <p className="text-2xl font-bold text-primary-600">
                  {m.value}
                </p>
                <p className="text-xs text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {study.challenge && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              The Challenge
            </h2>
            <PortableText value={study.challenge} />
          </div>
        )}

        {study.solution && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              The Solution
            </h2>
            <PortableText value={study.solution} />
          </div>
        )}

        {study.results && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              The Results
            </h2>
            <PortableText value={study.results} />
          </div>
        )}

        {study.testimonialQuote && (
          <blockquote className="my-10 rounded-xl bg-primary-50 p-8 dark:bg-primary-950/20">
            <Quote className="mb-3 h-8 w-8 text-primary-300" />
            <p className="mb-4 text-lg italic text-foreground">
              &ldquo;{study.testimonialQuote}&rdquo;
            </p>
            {(study.testimonialAuthor || study.testimonialRole) && (
              <footer className="text-sm text-muted">
                {study.testimonialAuthor}
                {study.testimonialRole ? `, ${study.testimonialRole}` : ''}
              </footer>
            )}
          </blockquote>
        )}
      </article>
    </Section>
  )
}
