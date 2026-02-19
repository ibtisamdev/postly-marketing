import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BUILDER_QUERY } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/components/page-builder/section-renderer'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug: 'home' },
  })

  const seo = data?.page?.seo

  return {
    title: seo?.title || 'Postly — Schedule, Publish & Grow Your Social Media',
    description:
      seo?.description ||
      'Postly helps teams plan, schedule, and analyze their social media content across every platform from one powerful dashboard.',
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug: 'home' },
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
