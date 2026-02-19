'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

type HelpfulFeedbackProps = {
  postId: string
}

export function HelpfulFeedback({ postId }: HelpfulFeedbackProps) {
  const [selected, setSelected] = useState<boolean | null>(null)

  async function handleFeedback(helpful: boolean) {
    setSelected(helpful)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, helpful }),
      })
    } catch {
      // Silently handle — feedback is non-critical
    }
  }

  if (selected !== null) {
    return (
      <p className="text-sm font-medium text-foreground">
        Thanks for your feedback!
      </p>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground">
        Was this helpful?
      </span>
      <button
        type="button"
        onClick={() => handleFeedback(true)}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-primary-50 hover:text-primary-600"
        aria-label="Yes, this was helpful"
      >
        <ThumbsUp className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => handleFeedback(false)}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-primary-50 hover:text-primary-600"
        aria-label="No, this was not helpful"
      >
        <ThumbsDown className="h-5 w-5" />
      </button>
    </div>
  )
}
