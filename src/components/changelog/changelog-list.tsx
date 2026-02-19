'use client'

import { useMemo, useState } from 'react'
import { ChangelogFilter } from '@/components/changelog/changelog-filter'
import { ChangelogItem } from '@/components/changelog/changelog-item'
import { ChangelogSubscribe } from '@/components/changelog/changelog-subscribe'

type Entry = {
  _id: string
  title: string | null
  version: string | null
  date: string | null
  changeType: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
}

export function ChangelogList({ entries }: { entries: Entry[] }) {
  const [activeType, setActiveType] = useState<string | null>(null)

  const types = useMemo(() => {
    const set = new Set<string>()
    for (const entry of entries) {
      if (entry.changeType) set.add(entry.changeType)
    }
    return Array.from(set)
  }, [entries])

  const filtered = useMemo(() => {
    if (!activeType) return entries
    return entries.filter((e) => e.changeType === activeType)
  }, [entries, activeType])

  return (
    <div className="mx-auto max-w-2xl">
      {types.length > 1 && (
        <div className="mb-8">
          <ChangelogFilter
            types={types}
            activeType={activeType}
            onTypeChange={setActiveType}
          />
        </div>
      )}

      {filtered.length > 0 ? (
        filtered.map((entry) => (
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

      <div className="mt-12">
        <ChangelogSubscribe />
      </div>
    </div>
  )
}
