import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { SEARCH_QUERY } from '@/sanity/lib/queries'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await client.fetch(SEARCH_QUERY, { searchTerm: query })
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 },
    )
  }
}
