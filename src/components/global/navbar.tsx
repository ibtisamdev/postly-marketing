import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { MobileNav } from './mobile-nav'

export async function Navbar() {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = data as any

  type NavLink = {
    _key: string
    label: string | null
    linkType: string | null
    href: string | null
    url: string | null
  }

  const navLinks: NavLink[] = settings?.navLinks ?? []

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">
            {settings?.siteName || 'Postly'}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const linkType = stegaClean(link.linkType)
            const destination =
              linkType === 'external' ? link.url : link.href
            return (
              <li key={link._key}>
                <a
                  href={destination || '#'}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Get Started
          </Button>
          <MobileNav links={navLinks} />
        </div>
      </nav>
    </header>
  )
}
