import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {
  TEAM_MEMBERS_QUERY,
  HOMEPAGE_STATS_QUERY,
} from '@/sanity/lib/queries'
import { Mission } from '@/components/about/mission'
import { Values } from '@/components/about/values'
import { TeamGrid } from '@/components/about/team-grid'
import { StatsBar } from '@/components/home/stats-bar'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: 'About — Postly',
  description:
    'Learn about the team and mission behind Postly, the social media management platform built for modern marketers.',
}

export default async function AboutPage() {
  const [membersRes, statsRes] = await Promise.all([
    sanityFetch({ query: TEAM_MEMBERS_QUERY }),
    sanityFetch({ query: HOMEPAGE_STATS_QUERY }),
  ])

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const members = (membersRes.data ?? []) as any[]
  const stats = (statsRes.data ?? []) as any[]
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <>
      <Mission />
      <Values />
      <TeamGrid members={members} />
      <StatsBar stats={stats} />
      <FinalCta />
    </>
  )
}
