import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/ui/sanity-image'
import { formatDate } from '@/lib/utils'

type PostHeaderProps = {
  title: string | null
  excerpt: string | null
  publishedAt: string | null
  coverImage: Parameters<typeof SanityImage>[0]['value']
  author: {
    name: string | null
    slug: string | null
    avatar: Parameters<typeof SanityImage>[0]['value']
    role: string | null
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

export function PostHeader({
  title,
  excerpt,
  publishedAt,
  coverImage,
  author,
  categories,
}: PostHeaderProps) {
  return (
    <header className="mb-10">
      {categories && categories.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Badge key={cat._id}>{cat.title}</Badge>
          ))}
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {excerpt && (
        <p className="mt-4 text-lg text-muted">{excerpt}</p>
      )}
      <div className="mt-6 flex items-center gap-3">
        {author?.avatar && (
          <SanityImage
            value={author.avatar}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div className="text-sm">
          {author?.name && (
            <p className="font-medium text-foreground">{author.name}</p>
          )}
          {publishedAt && (
            <time dateTime={publishedAt} className="text-muted">
              {formatDate(publishedAt)}
            </time>
          )}
        </div>
      </div>
      {coverImage && (
        <SanityImage
          value={coverImage}
          width={1200}
          className="mt-8 rounded-xl"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      )}
    </header>
  )
}
