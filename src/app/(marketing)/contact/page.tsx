import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BUILDER_QUERY } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/components/page-builder/section-renderer'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug: 'contact' },
  })

  const seo = data?.page?.seo

  return {
    title: seo?.title || 'Contact — Postly',
    description:
      seo?.description ||
      'Get in touch with the Postly team. We are here to help with any questions about our platform.',
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function ContactPage() {
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug: 'contact' },
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
