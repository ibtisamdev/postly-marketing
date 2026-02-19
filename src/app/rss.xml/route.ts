import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_POSTS_QUERY } from '@/sanity/lib/queries'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://postly.com'

  const { data: posts } = await sanityFetch({
    query: BLOG_POSTS_QUERY,
    params: { start: 0, end: 50 },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = ((posts as any[]) ?? [])
    .map((post: { title?: string; slug?: string; excerpt?: string; publishedAt?: string }) => {
      const title = post.title ? escapeXml(post.title) : ''
      const slug = post.slug ?? ''
      const description = post.excerpt ? escapeXml(post.excerpt) : ''
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : ''
      const link = `${siteUrl}/blog/${slug}`

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Postly Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Latest posts from the Postly blog</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
