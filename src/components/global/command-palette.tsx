'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

type Page = {
  title: string
  href: string
  section?: string
}

type CommandPaletteProps = {
  pages: Page[]
}

export function CommandPalette({ pages }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Open / close with keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when dialog opens, lock scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Delay focus slightly so the input is mounted
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset query when dialog closes
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape key + focus trap
  useEffect(() => {
    if (!open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'input, a[href], button, [tabindex]:not([tabindex="-1"])',
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
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const filtered = useMemo(() => {
    if (!query.trim()) return pages
    const lower = query.toLowerCase()
    return pages.filter((page) => page.title.toLowerCase().includes(lower))
  }, [query, pages])

  const grouped = useMemo(() => {
    const groups: Record<string, Page[]> = {}
    for (const page of filtered) {
      const section = page.section || 'Pages'
      if (!groups[section]) groups[section] = []
      groups[section].push(page)
    }
    return groups
  }, [filtered])

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-xs text-muted sm:inline-block">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No results found.
            </p>
          ) : (
            Object.entries(grouped).map(([section, items]) => (
              <div key={section}>
                <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  {section}
                </p>
                <ul>
                  {items.map((page) => (
                    <li key={page.href}>
                      <button
                        type="button"
                        onClick={() => navigate(page.href)}
                        className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary-50 focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
                      >
                        {page.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
