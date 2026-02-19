'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string | null
}

type BlogSearchProps = {
  posts: Post[]
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setDebouncedQuery(value)
    }, 300)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const filteredPosts = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim()
    if (!search) return posts

    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(search)
      const excerptMatch = post.excerpt?.toLowerCase().includes(search) ?? false
      return titleMatch || excerptMatch
    })
  }, [debouncedQuery, posts])

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={handleChange}
          className="pl-9"
          aria-label="Search blog posts"
        />
      </div>

      {debouncedQuery.trim() !== '' && (
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-background" role="list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <li key={post._id}>
                <a
                  href={`/blog/${post.slug}`}
                  className="block px-4 py-3 transition-colors hover:bg-primary-50"
                >
                  <span className="text-sm font-medium text-foreground">
                    {post.title}
                  </span>
                  {post.excerpt && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                      {post.excerpt}
                    </p>
                  )}
                </a>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-sm text-muted">
              No posts found
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
