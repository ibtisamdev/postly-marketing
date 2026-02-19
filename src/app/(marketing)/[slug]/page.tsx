import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BUILDER_QUERY, PAGE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/components/page-builder/section-renderer'

type Props = {
  params: Promise<{ slug: string }>
}

const RESERVED_SLUGS = ['home', 'about', 'contact']

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: PAGE_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((data as any[]) ?? [])
    .filter((p: { slug?: string }) => !RESERVED_SLUGS.includes(p.slug ?? ''))
    .map((p: { slug?: string }) => ({ slug: p.slug! }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug },
  })

  const seo = data?.page?.seo

  return {
    title: seo?.title || data?.page?.title || 'Postly',
    description: seo?.description || '',
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function DynamicPage(props: Props) {
  const { slug } = await props.params
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug },
  })

  if (!data?.page) notFound()

  const { page, features, testimonials, integrations, stats, teamMembers } =
    data

  return (
    <SectionRenderer
      sections={page.sections}
      data={{
        features: features ?? [],
        testimonials: testimonials ?? [],
        integrations: integrations ?? [],
        stats: stats ?? [],
        teamMembers: teamMembers ?? [],
      }}
    />
  )
}
