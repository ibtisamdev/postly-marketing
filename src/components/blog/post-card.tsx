import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/ui/sanity-image'
import { formatDate } from '@/lib/utils'

type PostCardProps = {
  title: string | null
  slug: string | null
  excerpt: string | null
  publishedAt: string | null
  coverImage: Parameters<typeof SanityImage>[0]['value']
  author: {
    name: string | null
    avatar: Parameters<typeof SanityImage>[0]['value']
  } | null
  categories:
    | {
        _id: string
        title: string | null
        slug: string | null
        color: string | null
      }[]
    | null
}

export function PostCard({
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  author,
  categories,
}: PostCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <a href={`/blog/${slug}`} className="block">
        {coverImage && (
          <SanityImage
            value={coverImage}
            width={600}
            className="aspect-video w-full object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="p-5">
          {categories && categories.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <Badge key={cat._id} variant="default">
                  {cat.title}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="mb-1.5 text-lg font-semibold text-foreground group-hover:text-primary-600">
            {title}
          </h3>
          {excerpt && (
            <p className="mb-3 line-clamp-2 text-sm text-muted">{excerpt}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted">
            {author?.avatar && (
              <SanityImage
                value={author.avatar}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            {author?.name && <span>{author.name}</span>}
            {publishedAt && (
              <>
                <span aria-hidden>&middot;</span>
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              </>
            )}
          </div>
        </div>
      </a>
    </Card>
  )
}
