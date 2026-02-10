import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20" />
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-600">
          Social Media Management
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Schedule, publish &amp; grow your social media presence
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          Postly helps teams plan, schedule, and analyze their social media
          content across every platform — all from one powerful dashboard.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/pricing" size="lg">
            Start Free Trial
          </Button>
          <Button href="/features" variant="outline" size="lg">
            See All Features
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  )
}
