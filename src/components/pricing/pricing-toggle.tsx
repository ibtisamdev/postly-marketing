'use client'

import { cn } from '@/lib/utils'

export function PricingToggle({
  annual,
  onToggle,
}: {
  annual: boolean
  onToggle: () => void
}) {
  return (
    <div className="mb-12 flex items-center justify-center gap-3">
      <span
        className={cn(
          'text-sm font-medium',
          !annual ? 'text-foreground' : 'text-muted',
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        onClick={onToggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
          annual ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform',
            annual ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
      <span
        className={cn(
          'text-sm font-medium',
          annual ? 'text-foreground' : 'text-muted',
        )}
      >
        Annual
        <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          Save 20%
        </span>
      </span>
    </div>
  )
}
