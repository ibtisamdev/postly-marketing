'use client'

import { cn } from '@/lib/utils'
import { Toggle } from '@/components/ui/toggle'

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
      <Toggle
        checked={annual}
        onChange={onToggle}
        label="Toggle annual billing"
      />
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
