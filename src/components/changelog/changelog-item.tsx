import { Badge } from '@/components/ui/badge'
import { PortableText } from '@/components/content/portable-text'
import { formatDate } from '@/lib/utils'

const changeTypeConfig: Record<
  string,
  { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }
> = {
  feature: { label: 'New Feature', variant: 'default' },
  improvement: { label: 'Improvement', variant: 'success' },
  fix: { label: 'Bug Fix', variant: 'warning' },
  breaking: { label: 'Breaking Change', variant: 'destructive' },
}

type ChangelogItemProps = {
  title: string | null
  version: string | null
  date: string | null
  changeType: string | null
  body: Parameters<typeof PortableText>[0]['value']
}

export function ChangelogItem({
  title,
  version,
  date,
  changeType,
  body,
}: ChangelogItemProps) {
  const config = changeType
    ? changeTypeConfig[changeType] || changeTypeConfig.feature
    : changeTypeConfig.feature

  return (
    <article className="relative border-l-2 border-border pb-10 pl-8 last:pb-0">
      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary-600 bg-background" />
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant={config.variant}>{config.label}</Badge>
        {version && (
          <span className="text-sm font-mono font-medium text-foreground">
            v{version}
          </span>
        )}
        {date && (
          <time dateTime={date} className="text-sm text-muted">
            {formatDate(date)}
          </time>
        )}
      </div>
      <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3>
      <PortableText value={body} />
    </article>
  )
}
