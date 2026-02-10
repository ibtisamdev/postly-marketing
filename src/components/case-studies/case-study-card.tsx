import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/ui/sanity-image'

type CaseStudyCardProps = {
  title: string | null
  slug: string | null
  companyName: string | null
  industry: string | null
  featured: boolean | null
  coverImage: Parameters<typeof SanityImage>[0]['value']
  logo: Parameters<typeof SanityImage>[0]['value']
  metrics:
    | { _key: string; label: string | null; value: string | null }[]
    | null
}

export function CaseStudyCard({
  title,
  slug,
  companyName,
  industry,
  featured,
  coverImage,
  logo,
  metrics,
}: CaseStudyCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <a href={`/case-studies/${slug}`} className="block">
        {coverImage && (
          <SanityImage
            value={coverImage}
            width={600}
            className="aspect-video w-full object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <CardContent className="pt-5">
          <div className="mb-3 flex items-center gap-3">
            {logo && (
              <SanityImage
                value={logo}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {companyName}
              </p>
              {industry && (
                <p className="text-xs text-muted">{industry}</p>
              )}
            </div>
            {featured && (
              <Badge variant="default" className="ml-auto">
                Featured
              </Badge>
            )}
          </div>
          <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-primary-600">
            {title}
          </h3>
          {metrics && metrics.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {metrics.slice(0, 3).map((m) => (
                <div key={m._key}>
                  <p className="text-lg font-bold text-primary-600">
                    {m.value}
                  </p>
                  <p className="text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </a>
    </Card>
  )
}
