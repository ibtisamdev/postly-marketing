'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()

  if (environment !== 'live' && environment !== 'unknown') return null

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg hover:bg-gray-100"
    >
      Disable Draft Mode
    </a>
  )
}
