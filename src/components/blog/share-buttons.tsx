'use client'

import { Link2, Twitter, Linkedin } from 'lucide-react'
import { useState } from 'react'

type ShareButtonsProps = {
  title: string
  url?: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg p-2 text-muted transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg p-2 text-muted transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={copyLink}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </button>
      {copied && (
        <span className="text-xs text-green-600">Copied!</span>
      )}
    </div>
  )
}
