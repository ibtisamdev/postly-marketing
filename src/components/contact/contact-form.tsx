'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FormLabels = {
  nameLabel?: string | null
  namePlaceholder?: string | null
  emailLabel?: string | null
  emailPlaceholder?: string | null
  companyLabel?: string | null
  companyPlaceholder?: string | null
  messageLabel?: string | null
  messagePlaceholder?: string | null
  submitLabel?: string | null
  submittingLabel?: string | null
  successMessage?: string | null
}

type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export function ContactForm({ labels }: { labels?: FormLabels }) {
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'loading' })

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          message: formData.get('message'),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setState({
        status: 'success',
        message:
          labels?.successMessage ||
          'Message sent! We will get back to you soon.',
      })
      form.reset()
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {labels?.nameLabel || 'Name'}
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder={labels?.namePlaceholder || 'Your name'}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {labels?.emailLabel || 'Email'}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={labels?.emailPlaceholder || 'you@company.com'}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {labels?.companyLabel || 'Company (optional)'}
        </label>
        <Input
          id="company"
          name="company"
          placeholder={labels?.companyPlaceholder || 'Your company'}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {labels?.messageLabel || 'Message'}
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={labels?.messagePlaceholder || 'How can we help?'}
        />
      </div>
      <Button
        type="submit"
        disabled={state.status === 'loading'}
        className="w-full sm:w-auto"
      >
        {state.status === 'loading'
          ? labels?.submittingLabel || 'Sending...'
          : labels?.submitLabel || 'Send Message'}
      </Button>
      <div aria-live="polite" aria-atomic="true">
        {state.status === 'success' && (
          <p className="text-sm text-green-600">{state.message}</p>
        )}
        {state.status === 'error' && (
          <p className="text-sm text-red-600" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
