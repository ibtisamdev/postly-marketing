import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { LEGAL_PAGE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { PortableText } from '@/components/content/portable-text'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: LEGAL_PAGE_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!data) return {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = data as any
  return {
    title: `${page.seo?.title || page.title} — Postly`,
    description: page.seo?.description || '',
  }
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: LEGAL_PAGE_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!data) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = data as any

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {page.title}
          </h1>
          {page.lastUpdated && (
            <p className="mt-2 text-sm text-muted">
              Last updated:{' '}
              <time dateTime={page.lastUpdated}>
                {formatDate(page.lastUpdated)}
              </time>
            </p>
          )}
        </header>
        <PortableText value={page.body} />
      </article>
    </Section>
  )
}
