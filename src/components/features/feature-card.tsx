import { Card, CardContent } from '@/components/ui/card'
import { SanityImage } from '@/components/ui/sanity-image'
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

type FeatureCardProps = {
  title: string | null
  description: string | null
  icon: string | null
  screenshot: {
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

export function FeatureCard({
  title,
  description,
  icon,
  screenshot,
}: FeatureCardProps) {
  const Icon = icon ? iconMap[icon] : Sparkles
  return (
    <Card className="overflow-hidden">
      {screenshot && (
        <SanityImage
          value={screenshot}
          width={600}
          className="w-full border-b border-border object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <CardContent className="pt-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted">{description}</p>
      </CardContent>
    </Card>
  )
}
