import { Section } from '@/components/ui/section'
import { PortableText } from '@/components/content/portable-text'

type RichTextSectionProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[] | null
}

export function RichTextSection({ body }: RichTextSectionProps) {
  if (!body?.length) return null

  return (
    <Section>
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
        <PortableText value={body} />
      </div>
    </Section>
  )
}
