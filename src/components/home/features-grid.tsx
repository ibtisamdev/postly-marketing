import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import {
  Calendar,
  BarChart3,
  Users,
  Zap,
  Globe,
  Layout,
  Bell,
  Shield,
  Sparkles,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  BarChart3,
  Users,
  Zap,
  Globe,
  Layout,
  Bell,
  Shield,
  Sparkles,
}

type Feature = {
  _id: string
  title: string | null
  description: string | null
  icon: string | null
  slug: string | null
}

export function FeaturesGrid({ features }: { features: Feature[] }) {
  return (
    <Section>
      <Heading
        eyebrow="Features"
        title="Everything you need to succeed"
        description="Powerful tools designed to simplify your social media workflow."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon ? iconMap[feature.icon] : Sparkles
          return (
            <div key={feature._id} className="group">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                {Icon && <Icon className="h-5 w-5" />}
              </div>
              <h3 className="mb-1 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
