'use client'

import { cn } from '@/lib/utils'

type ChangelogFilterProps = {
  types: string[]
  activeType: string | null
  onTypeChange: (type: string | null) => void
}

const typeLabels: Record<string, string> = {
  feature: 'Feature',
  improvement: 'Improvement',
  fix: 'Fix',
  breaking: 'Breaking',
}

export function ChangelogFilter({
  types,
  activeType,
  onTypeChange,
}: ChangelogFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTypeChange(null)}
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
          activeType === null
            ? 'bg-primary-600 text-white'
            : 'bg-primary-50 text-foreground hover:bg-primary-100',
        )}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeType === type
              ? 'bg-primary-600 text-white'
              : 'bg-primary-50 text-foreground hover:bg-primary-100',
          )}
        >
          {typeLabels[type] ?? type}
        </button>
      ))}
    </div>
  )
}
