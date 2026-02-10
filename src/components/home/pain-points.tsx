import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Shuffle, BarChart3 } from 'lucide-react'

const painPoints = [
  {
    id: 'time',
    icon: Clock,
    title: 'Spending hours posting manually?',
    description:
      'Juggling multiple platforms and logging in one by one eats up your entire day. You deserve a better workflow.',
  },
  {
    id: 'consistency',
    icon: Shuffle,
    title: 'Struggling with consistency?',
    description:
      'Gaps in your posting schedule mean lost engagement and forgotten audiences. A consistent presence is key to growth.',
  },
  {
    id: 'data',
    icon: BarChart3,
    title: 'Flying blind without data?',
    description:
      'Without clear analytics, you cannot tell what is working. Make data-driven decisions instead of guessing.',
  },
]

export function PainPoints() {
  return (
    <Section>
      <Heading
        eyebrow="The Problem"
        title="Sound familiar?"
        description="Social media management should not feel like a full-time job."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {painPoints.map((point) => (
          <Card key={point.id} className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <point.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="text-sm text-muted">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
