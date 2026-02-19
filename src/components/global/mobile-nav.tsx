'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'

type NavLink = {
  _key: string
  label: string | null
  linkType: string | null
  href: string | null
  url: string | null
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Focus trap + Escape key
  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
        return
      }

      if (e.key === 'Tab' && navRef.current) {
        const focusable = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Focus the close button on open
    const closeBtn = navRef.current?.querySelector<HTMLElement>('button')
    closeBtn?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-muted hover:text-foreground"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            ref={navRef}
            className={cn(
              'fixed inset-y-0 right-0 z-50 w-72 bg-background p-6 shadow-xl',
            )}
            aria-label="Mobile navigation"
          >
            <div className="mb-8 flex justify-end">
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-2 text-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="space-y-1">
              {links.map((link) => {
                const linkType = stegaClean(link.linkType)
                const destination =
                  linkType === 'external' ? link.url : link.href
                return (
                  <li key={link._key}>
                    <a
                      href={destination || '#'}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-primary-50"
                      {...(linkType === 'external'
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}
