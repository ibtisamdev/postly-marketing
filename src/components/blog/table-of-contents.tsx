'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// ---------- Types ----------

type PortableTextSpan = {
  _type?: string
  text?: string
}

type PortableTextChild = PortableTextSpan | { _type: string; [key: string]: unknown }

type PortableTextBlock = {
  _key?: string
  _type?: string
  style?: string
  children?: PortableTextChild[]
}

type HeadingItem = {
  id: string
  text: string
  level: 2 | 3
}

type TableOfContentsProps = {
  body: PortableTextBlock[] | null | undefined
}

// ---------- Helpers ----------

/**
 * Convert a heading string into a URL-friendly slug.
 * Must stay in sync with the slug logic in portable-text.tsx so the
 * generated `id` attributes match the anchor hrefs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Extract the plain-text content from a Portable Text block's children.
 */
function blockText(block: PortableTextBlock): string {
  if (!block.children) return ''
  return block.children
    .filter(
      (child): child is PortableTextSpan =>
        child._type === 'span' || !child._type,
    )
    .map((span) => span.text ?? '')
    .join('')
}

/**
 * Walk the body array and pull out every h2/h3 block as a heading item.
 */
function extractHeadings(body: PortableTextBlock[]): HeadingItem[] {
  const headings: HeadingItem[] = []
  const slugCounts = new Map<string, number>()

  for (const block of body) {
    if (block._type !== 'block') continue
    if (block.style !== 'h2' && block.style !== 'h3') continue

    const text = blockText(block)
    if (!text) continue

    let slug = slugify(text)

    // Deduplicate slugs for repeated heading text
    const count = slugCounts.get(slug) ?? 0
    slugCounts.set(slug, count + 1)
    if (count > 0) {
      slug = `${slug}-${count}`
    }

    headings.push({
      id: slug,
      text,
      level: block.style === 'h2' ? 2 : 3,
    })
  }

  return headings
}

// ---------- Component ----------

export function TableOfContents({ body }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map(),
  )

  const headings = body ? extractHeadings(body) : []

  // ---- IntersectionObserver to track the visible heading ----
  useEffect(() => {
    if (headings.length === 0) return

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    if (headingElements.length === 0) return

    /**
     * When multiple headings are intersecting we pick the one closest
     * to the top of the viewport so the highlight feels natural as the
     * reader scrolls down.
     */
    function handleIntersect(entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        headingElementsRef.current.set(entry.target.id, entry)
      }

      const visibleHeadings: IntersectionObserverEntry[] = []
      headingElementsRef.current.forEach((entry) => {
        if (entry.isIntersecting) visibleHeadings.push(entry)
      })

      if (visibleHeadings.length > 0) {
        const sorted = visibleHeadings.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )
        setActiveId(sorted[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
    })

    for (const el of headingElements) {
      observerRef.current.observe(el)
    }

    return () => {
      observerRef.current?.disconnect()
    }
    // Re-run only when the heading list changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headings.map((h) => h.id).join(',')])

  // Don't render anything if there are fewer than 2 headings
  if (headings.length < 2) return null

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto xl:block"
    >
      <p className="mb-3 text-sm font-semibold text-foreground">
        On this page
      </p>

      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => {
          const isActive = activeId === heading.id

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.getElementById(heading.id)
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                    // Update the URL hash without jumping
                    window.history.replaceState(null, '', `#${heading.id}`)
                    setActiveId(heading.id)
                  }
                }}
                className={cn(
                  'block border-l-2 py-1 text-sm leading-snug transition-colors',
                  heading.level === 2 ? 'pl-4' : 'pl-7',
                  isActive
                    ? 'border-primary-600 font-medium text-primary-600'
                    : 'border-transparent text-muted hover:border-border hover:text-foreground',
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
