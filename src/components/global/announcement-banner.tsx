'use client'

import { useSyncExternalStore } from 'react'
import { X } from 'lucide-react'
import { stegaClean } from '@sanity/client/stega'

type AnnouncementBannerProps = {
  banner: {
    enabled: boolean | null
    text: string | null
    link: {
      label: string | null
      linkType: string | null
      href: string | null
      url: string | null
    } | null
  } | null
}

function subscribeToBannerDismissed(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getBannerDismissed() {
  return localStorage.getItem('banner-dismissed') === 'true'
}

export function AnnouncementBanner({ banner }: AnnouncementBannerProps) {
  const dismissed = useSyncExternalStore(
    subscribeToBannerDismissed,
    getBannerDismissed,
    () => true,
  )

  if (!banner?.enabled || !banner.text || dismissed) return null

  const linkType = stegaClean(banner.link?.linkType)
  const destination =
    linkType === 'external' ? banner.link?.url : banner.link?.href

  return (
    <div className="relative bg-primary-600 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-sm">
        <span>{banner.text}</span>
        {banner.link?.label && destination && (
          <a
            href={destination}
            className="font-semibold underline underline-offset-2"
            {...(linkType === 'external'
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {banner.link.label}
          </a>
        )}
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('banner-dismissed', 'true')
            window.dispatchEvent(new StorageEvent('storage'))
          }}
          className="absolute right-4 rounded p-1 hover:bg-primary-700"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
