import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_RELATED_POSTS_QUERY,
  BLOG_SLUGS_QUERY,
} from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { PostHeader } from '@/components/blog/post-header'
import { PostCard } from '@/components/blog/post-card'
import { PortableText } from '@/components/content/portable-text'
import { Heading } from '@/components/ui/heading'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { ShareButtons } from '@/components/blog/share-buttons'
import { HelpfulFeedback } from '@/components/blog/helpful-feedback'
import { NewsletterCta } from '@/components/blog/newsletter-cta'
import { calculateReadingTime } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: BLOG_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((data as any[]) ?? []).map((p: { slug?: string }) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
  })
  if (!data) return {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = data as any
  return {
    title: `${post.seo?.title || post.title} — Postly Blog`,
    description: post.seo?.description || post.excerpt || '',
    openGraph: {
      title: post.seo?.title || post.title || '',
      description: post.seo?.description || post.excerpt || '',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!data) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = data as any

  const categoryIds = (post.categories ?? []).map(
    (c: { _id: string }) => c._id,
  )

  const { data: related } = await sanityFetch({
    query: BLOG_RELATED_POSTS_QUERY,
    params: { slug, categoryIds },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const relatedPosts = (related ?? []) as any[]

  const bodyText = (post.body ?? [])
    .filter((b: { _type: string }) => b._type === 'block')
    .map((b: { children?: { text?: string }[] }) =>
      (b.children ?? []).map((c) => c.text ?? '').join(''),
    )
    .join(' ')
  const readingTime = calculateReadingTime(bodyText)

  const postUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || 'https://postly.com') +
    `/blog/${slug}`

  return (
    <Section>
      <div className="relative mx-auto max-w-7xl xl:grid xl:grid-cols-[1fr_250px] xl:gap-10">
        <article className="mx-auto max-w-3xl xl:mx-0">
          <PostHeader
            title={post.title}
            excerpt={post.excerpt}
            publishedAt={post.publishedAt}
            coverImage={post.coverImage}
            author={post.author}
            categories={post.categories}
            readingTime={readingTime}
          />
          <PortableText value={post.body} />

          <footer className="mt-12 space-y-8 border-t border-border pt-8">
            <ShareButtons url={postUrl} title={post.title ?? ''} />
            <HelpfulFeedback postId={post._id} />
          </footer>
        </article>

        <aside className="hidden xl:block">
          <TableOfContents body={post.body} />
        </aside>
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        <NewsletterCta />
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-20">
          <Heading title="Related articles" align="center" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relPost) => (
              <PostCard
                key={relPost._id}
                title={relPost.title}
                slug={relPost.slug}
                excerpt={relPost.excerpt}
                publishedAt={relPost.publishedAt}
                coverImage={relPost.coverImage}
                author={relPost.author}
                categories={null}
              />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
