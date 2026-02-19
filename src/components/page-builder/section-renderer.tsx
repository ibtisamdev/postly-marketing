/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hero } from '@/components/home/hero'
import { PainPoints } from '@/components/home/pain-points'
import { FeaturesGrid } from '@/components/home/features-grid'
import { StatsBar } from '@/components/home/stats-bar'
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel'
import { IntegrationsBar } from '@/components/home/integrations-bar'
import { FinalCta } from '@/components/home/final-cta'
import { Mission } from '@/components/about/mission'
import { Values } from '@/components/about/values'
import { TeamGrid } from '@/components/about/team-grid'
import { ContactFormSection } from '@/components/contact/contact-form-section'
import { FaqSection } from '@/components/page-builder/faq-section'
import { RichTextSection } from '@/components/page-builder/rich-text-section'
import { OpenPositionsCta } from '@/components/page-builder/open-positions-cta'

type SectionRendererProps = {
  sections: Array<{ _type: string; _key: string; [key: string]: unknown }> | null
  data: {
    features: Array<{
      _id: string
      title: string | null
      description: string | null
      icon: string | null
      slug: string | null
    }>
    testimonials: Array<{
      _id: string
      quote: string | null
      name: string | null
      role: string | null
      company: string | null
      avatar: unknown
    }>
    integrations: Array<{
      _id: string
      name: string | null
      logo: unknown
      description: string | null
      url: string | null
      category: string | null
    }>
    stats: Array<{
      _id: string
      label: string | null
      value: string | null
      icon: string | null
    }>
    teamMembers: Array<{
      _id: string
      name: string | null
      role: string | null
      bio: string | null
      photo: unknown
      socialLinks: Array<{
        _key: string
        platform: string | null
        url: string | null
      }> | null
    }>
  }
}

export function SectionRenderer({ sections, data }: SectionRendererProps) {
  if (!Array.isArray(sections)) return null

  return (
    <>
      {sections.map((section, index) => {
        switch (section._type) {
          case 'sectionHero':
            return (
              <Hero
                key={section._key}
                level={index === 0 ? 'h1' : 'h2'}
                {...(section as any)}
              />
            )
          case 'sectionPainPoints':
            return <PainPoints key={section._key} {...(section as any)} />
          case 'sectionFeaturesGrid':
            return (
              <FeaturesGrid
                key={section._key}
                features={data.features}
                {...(section as any)}
              />
            )
          case 'sectionStatsBar':
            return (
              <StatsBar
                key={section._key}
                stats={data.stats}
                {...(section as any)}
              />
            )
          case 'sectionTestimonials':
            return (
              <TestimonialsCarousel
                key={section._key}
                testimonials={data.testimonials}
                {...(section as any)}
              />
            )
          case 'sectionIntegrations':
            return (
              <IntegrationsBar
                key={section._key}
                integrations={data.integrations}
                {...(section as any)}
              />
            )
          case 'sectionCta':
            return <FinalCta key={section._key} {...(section as any)} />
          case 'sectionMission':
            return <Mission key={section._key} {...(section as any)} />
          case 'sectionValues':
            return <Values key={section._key} {...(section as any)} />
          case 'sectionTeamGrid':
            return (
              <TeamGrid
                key={section._key}
                members={data.teamMembers}
                {...(section as any)}
              />
            )
          case 'sectionContactForm':
            return (
              <ContactFormSection key={section._key} {...(section as any)} />
            )
          case 'sectionFaq':
            return <FaqSection key={section._key} {...(section as any)} />
          case 'sectionRichText':
            return <RichTextSection key={section._key} {...(section as any)} />
          case 'sectionOpenPositions':
            return (
              <OpenPositionsCta key={section._key} {...(section as any)} />
            )
          default:
            return null
        }
      })}
    </>
  )
}
