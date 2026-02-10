import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Card, CardContent } from '@/components/ui/card'
import { SanityImage } from '@/components/ui/sanity-image'
import { Quote } from 'lucide-react'

type Testimonial = {
  _id: string
  quote: string | null
  name: string | null
  role: string | null
  company: string | null
  avatar: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: { width?: number; height?: number }
      }
    }
    alt?: string
    hotspot?: { x?: number; y?: number }
    crop?: {
      top?: number
      bottom?: number
      left?: number
      right?: number
    }
  } | null
}

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  if (!testimonials.length) return null

  return (
    <Section className="bg-primary-50/30 dark:bg-primary-950/10">
      <Heading
        eyebrow="Testimonials"
        title="Loved by teams everywhere"
        description="See what our customers have to say about Postly."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t._id} className="relative">
            <CardContent className="pt-6">
              <Quote className="mb-3 h-6 w-6 text-primary-300" />
              <blockquote className="mb-4 text-sm text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {t.avatar && (
                  <SanityImage
                    value={t.avatar}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">
                    {t.role}
                    {t.company ? `, ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
