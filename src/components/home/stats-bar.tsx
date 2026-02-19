import { Section } from '@/components/ui/section'
import { getIcon } from '@/lib/icon-map'

type StatsItem = {
  _id: string
  label: string | null
  value: string | null
  icon: string | null
}

type StatsBarProps = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  stats: StatsItem[]
}

export function StatsBar({ stats }: StatsBarProps) {
  if (!stats.length) return null

  return (
    <Section className="bg-primary-600 text-white dark:bg-primary-900">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = getIcon(stat.icon)
          return (
            <div key={stat._id} className="text-center">
              {Icon && (
                <Icon className="mx-auto mb-2 h-6 w-6 text-primary-200" />
              )}
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-primary-200">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
