import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type SanityImageProps = {
  value: {
    asset?: { _id?: string; url?: string; metadata?: { lqip?: string; dimensions?: { width?: number; height?: number } } }
    alt?: string
    hotspot?: { x?: number; y?: number }
    crop?: { top?: number; bottom?: number; left?: number; right?: number }
  } | null
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SanityImage({
  value,
  width = 800,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 800px',
}: SanityImageProps) {
  if (!value?.asset) return null

  const computedHeight =
    height ||
    (value.asset.metadata?.dimensions?.width &&
    value.asset.metadata?.dimensions?.height
      ? Math.round(
          (width * value.asset.metadata.dimensions.height) /
            value.asset.metadata.dimensions.width,
        )
      : Math.round(width / 1.5))

  let builder = urlFor(value).width(width).height(computedHeight)

  if (value.hotspot) {
    builder = builder
      .fit('crop')
      .crop('focalpoint')
      .focalPoint(value.hotspot.x ?? 0.5, value.hotspot.y ?? 0.5)
  }

  return (
    <Image
      className={className}
      src={builder.url()}
      alt={value.alt || ''}
      width={width}
      height={computedHeight}
      priority={priority}
      sizes={sizes}
      placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={value.asset.metadata?.lqip}
    />
  )
}
