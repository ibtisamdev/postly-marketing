import type {
  Article,
  BreadcrumbList,
  FAQPage,
  Organization,
  WithContext,
} from 'schema-dts'

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export function organizationJsonLd(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Postly',
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    sameAs: [],
  }
}

export function articleJsonLd({
  title,
  description,
  url,
  imageUrl,
  authorName,
  publishedAt,
  modifiedAt,
}: {
  title: string
  description: string
  url: string
  imageUrl?: string
  authorName?: string
  publishedAt?: string
  modifiedAt?: string
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Person',
      name: authorName || 'Postly Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Postly',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.png`,
      },
    },
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt && { dateModified: modifiedAt }),
  }
}

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>,
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; href: string }>,
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  }
}
