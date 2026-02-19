'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterCta() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error('Failed to subscribe')

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-xl border border-border bg-primary-50/50 p-6 dark:bg-primary-950/10">
      <h3 className="text-lg font-semibold text-foreground">
        Stay up to date
      </h3>
      <p className="mt-1 text-sm text-muted">
        Get the latest posts delivered right to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <p className="mt-2 text-sm text-green-600">
            Thanks for subscribing!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  )
}
