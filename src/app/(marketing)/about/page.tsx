import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BUILDER_QUERY } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/components/page-builder/section-renderer'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug: 'about' },
  })

  const seo = data?.page?.seo

  return {
    title: seo?.title || 'About — Postly',
    description:
      seo?.description ||
      'Learn about the team and mission behind Postly, the social media management platform built for modern marketers.',
    ...(seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function AboutPage() {
  const { data } = await sanityFetch({
    query: PAGE_BUILDER_QUERY,
    params: { slug: 'about' },
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
