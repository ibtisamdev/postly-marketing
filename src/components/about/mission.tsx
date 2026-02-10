import { Section } from '@/components/ui/section'

export function Mission() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600">
          Our Mission
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Making social media management effortless
        </h1>
        <p className="mt-6 text-lg text-muted">
          We believe every team deserves powerful, intuitive tools to grow their
          brand online. Postly was built by marketers, for marketers — so you
          can spend less time managing platforms and more time creating content
          that resonates.
        </p>
      </div>
    </Section>
  )
}
