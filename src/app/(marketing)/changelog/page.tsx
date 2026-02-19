import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { CHANGELOG_ENTRIES_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { ChangelogList } from '@/components/changelog/changelog-list'

export const metadata: Metadata = {
  title: 'Changelog — Postly',
  description:
    'Stay up to date with the latest features, improvements, and fixes to Postly.',
}

export default async function ChangelogPage() {
  const { data: entries } = await sanityFetch({
    query: CHANGELOG_ENTRIES_QUERY,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entryList = (entries ?? []) as any[]

  return (
    <Section>
      <Heading
        eyebrow="Changelog"
        title="What's new"
        description="All the latest updates and improvements to Postly."
      />
      <ChangelogList entries={entryList} />
    </Section>
  )
}
