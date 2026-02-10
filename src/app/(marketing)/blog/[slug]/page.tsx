import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_RELATED_POSTS_QUERY,
} from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { PostHeader } from '@/components/blog/post-header'
import { PostCard } from '@/components/blog/post-card'
import { PortableText } from '@/components/content/portable-text'
import { Heading } from '@/components/ui/heading'

type Props = { params: Promise<{ slug: string }> }

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

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <PostHeader
          title={post.title}
          excerpt={post.excerpt}
          publishedAt={post.publishedAt}
          coverImage={post.coverImage}
          author={post.author}
          categories={post.categories}
        />
        <PortableText value={post.body} />
      </article>

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
