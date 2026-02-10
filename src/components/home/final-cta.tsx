import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export function FinalCta() {
  return (
    <Section className="text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to level up your social media?
        </h2>
        <p className="mt-4 text-lg text-muted">
          Join thousands of marketers who save hours every week with Postly.
          Start your free trial today.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/pricing" size="lg">
            Get Started Free
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Talk to Sales
          </Button>
        </div>
      </div>
    </Section>
  )
}
