import { SanityLive } from '@/sanity/lib/live'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { SkipLink } from '@/components/global/skip-link'
import { AnnouncementBanner } from '@/components/global/announcement-banner'
import { Navbar } from '@/components/global/navbar'
import { Footer } from '@/components/global/footer'

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
      <SanityLive />
    </>
  )
}
