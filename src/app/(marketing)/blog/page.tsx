import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {
  BLOG_POSTS_QUERY,
  BLOG_POSTS_COUNT_QUERY,
} from '@/sanity/lib/queries'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { PostCard } from '@/components/blog/post-card'
import { Pagination } from '@/components/blog/pagination'

export const metadata: Metadata = {
  title: 'Blog — Postly',
  description:
    'Tips, guides, and insights on social media marketing from the Postly team.',
}

const POSTS_PER_PAGE = 9

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [{ data: posts }, { data: totalCount }] = await Promise.all([
    sanityFetch({
      query: BLOG_POSTS_QUERY,
      params: { start, end },
    }),
    sanityFetch({ query: BLOG_POSTS_COUNT_QUERY }),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postList = (posts ?? []) as any[]
  const totalPages = Math.ceil(
    (typeof totalCount === 'number' ? totalCount : 0) / POSTS_PER_PAGE,
  )

  return (
    <Section>
      <Heading
        eyebrow="Blog"
        title="Latest articles"
        description="Tips, guides, and insights on social media marketing."
      />
      {postList.length > 0 ? (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {postList.map((post) => (
              <PostCard
                key={post._id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                coverImage={post.coverImage}
                author={post.author}
                categories={post.categories}
              />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <p className="text-center text-muted">
          No posts yet. Check back soon!
        </p>
      )}
    </Section>
  )
}
