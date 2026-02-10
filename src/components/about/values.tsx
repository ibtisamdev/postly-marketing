import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { Heart, Lightbulb, Shield, Users } from 'lucide-react'

const values = [
  {
    id: 'simplicity',
    icon: Lightbulb,
    title: 'Simplicity First',
    description:
      'We strip away complexity so you can focus on what matters — great content.',
  },
  {
    id: 'transparency',
    icon: Shield,
    title: 'Radical Transparency',
    description:
      'No hidden fees, no gated features. What you see is what you get.',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community Driven',
    description:
      'Our roadmap is shaped by the feedback of real users building real brands.',
  },
  {
    id: 'craft',
    icon: Heart,
    title: 'Crafted with Care',
    description:
      'Every pixel, every interaction is thoughtfully designed for a delightful experience.',
  },
]

export function Values() {
  return (
    <Section>
      <Heading
        eyebrow="Our Values"
        title="What we stand for"
        description="The principles that guide everything we build."
      />
      <div className="grid gap-8 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.id} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <v.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
