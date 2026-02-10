import { stegaClean } from '@sanity/client/stega'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

type LinkGroup = {
  heading: string | null
  links: Array<{
    _key: string
    label: string | null
    linkType: string | null
    href: string | null
    url: string | null
  }> | null
} | null

function FooterLinkGroup({ group }: { group: LinkGroup }) {
  if (!group?.links?.length) return null

  return (
    <div>
      {group.heading && (
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          {group.heading}
        </h3>
      )}
      <ul className="space-y-2">
        {group.links.map((link) => {
          const linkType = stegaClean(link.linkType)
          const destination =
            linkType === 'external' ? link.url : link.href
          return (
            <li key={link._key}>
              <a
                href={destination || '#'}
                className="text-sm text-muted transition-colors hover:text-foreground"
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
    </div>
  )
}

const socialIcons: Record<string, string> = {
  x: 'X',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  website: 'Website',
}

export async function Footer() {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = data as any

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <FooterLinkGroup group={settings?.footerLinks1} />
          <FooterLinkGroup group={settings?.footerLinks2} />
          <FooterLinkGroup group={settings?.footerLinks3} />
          <FooterLinkGroup group={settings?.footerLinks4} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()}{' '}
            {settings?.siteName || 'Postly'}. All rights reserved.
          </p>
          {settings?.socialLinks && settings.socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {settings.socialLinks.map((social: { _key: string; url: string; platform: string }) => (
                <a
                  key={social._key}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                  aria-label={
                    socialIcons[stegaClean(social.platform) || ''] ||
                    'Social'
                  }
                >
                  {socialIcons[stegaClean(social.platform) || ''] ||
                    social.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
