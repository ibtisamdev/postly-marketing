import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Postly'
  const description =
    searchParams.get('description') || 'Schedule smarter. Grow faster.'

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center bg-white"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #7c3aed 100%)',
        }}
      >
        <div tw="flex flex-col items-center justify-center px-20 text-center">
          <div tw="flex items-center mb-8">
            <div tw="text-5xl font-bold text-white mr-3">Postly</div>
          </div>
          <div tw="text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            {title}
          </div>
          <div tw="text-2xl text-blue-100 max-w-3xl">{description}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
