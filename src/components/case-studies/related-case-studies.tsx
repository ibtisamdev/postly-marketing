import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SanityImage } from '@/components/ui/sanity-image'

type RelatedStudy = {
  _id: string
  title: string
  slug: string
  companyName?: string | null
  industry?: string | null
  coverImage?: Parameters<typeof SanityImage>[0]['value']
}

type RelatedCaseStudiesProps = {
  studies: RelatedStudy[]
}

export function RelatedCaseStudies({ studies }: RelatedCaseStudiesProps) {
  if (!studies || studies.length === 0) return null

  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Related Case Studies
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studies.slice(0, 3).map((study) => (
          <Card
            key={study._id}
            className="group overflow-hidden transition-shadow hover:shadow-md"
          >
            <a href={`/case-studies/${study.slug}`} className="block">
              {study.coverImage && (
                <SanityImage
                  value={study.coverImage}
                  width={600}
                  className="aspect-video w-full object-cover transition-transform group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <CardContent className="pt-5">
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary-600">
                  {study.title}
                </h3>
                <div className="flex items-center gap-2">
                  {study.companyName && (
                    <p className="text-sm text-muted">{study.companyName}</p>
                  )}
                  {study.industry && (
                    <Badge variant="default">{study.industry}</Badge>
                  )}
                </div>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </section>
  )
}
