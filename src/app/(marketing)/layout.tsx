import { SanityLive } from '@/sanity/lib/live'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { SkipLink } from '@/components/global/skip-link'
import { AnnouncementBanner } from '@/components/global/announcement-banner'
import { Navbar } from '@/components/global/navbar'
import { Footer } from '@/components/global/footer'
import { BackToTop } from '@/components/global/back-to-top'
import { CookieConsent } from '@/components/global/cookie-consent'
import { CommandPalette } from '@/components/global/command-palette'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = data as any

  return (
    <>
      <SkipLink />
      <AnnouncementBanner banner={settings?.announcementBanner ?? null} />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsent />
      <CommandPalette
        pages={[
          { title: 'Home', href: '/', section: 'Main' },
          { title: 'Features', href: '/features', section: 'Main' },
          { title: 'Pricing', href: '/pricing', section: 'Main' },
          { title: 'About', href: '/about', section: 'Main' },
          { title: 'Contact', href: '/contact', section: 'Main' },
          { title: 'Blog', href: '/blog', section: 'Content' },
          { title: 'Case Studies', href: '/case-studies', section: 'Content' },
          { title: 'Changelog', href: '/changelog', section: 'Content' },
          { title: 'Integrations', href: '/integrations', section: 'Content' },
        ]}
      />
      <SanityLive />
    </>
  )
}
