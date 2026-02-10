import { cn } from '@/lib/utils'

type SectionProps = React.ComponentProps<'section'> & {
  padded?: boolean
}

export function Section({
  padded = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'mx-auto max-w-7xl',
        padded && 'px-4 py-16 sm:px-6 sm:py-24 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
