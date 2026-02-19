'use client'

import { useEffect, useState } from 'react'

const COOKIE_KEY = 'postly-cookie-consent'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe: reads localStorage on mount
    if (!consent) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setShow(false)
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg sm:flex sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-muted">
        We use cookies to improve your experience. By continuing to use this
        site, you agree to our use of cookies.
      </p>
      <div className="mt-3 flex gap-3 sm:mt-0 sm:shrink-0">
        <button
          onClick={decline}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
