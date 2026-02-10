import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { CHANGELOG_ENTRIES_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { ChangelogItem } from '@/components/changelog/changelog-item'

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
      <div className="mx-auto max-w-2xl">
        {entryList.length > 0 ? (
          entryList.map((entry) => (
            <ChangelogItem
              key={entry._id}
              title={entry.title}
              version={entry.version}
              date={entry.date}
              changeType={entry.changeType}
              body={entry.body}
            />
          ))
        ) : (
          <p className="text-center text-muted">
            No changelog entries yet. Check back soon!
          </p>
        )}
      </div>
    </Section>
  )
}
