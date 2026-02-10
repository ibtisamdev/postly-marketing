import { cn } from '@/lib/utils'

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  href?: string
}

const variantClasses = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-primary-50',
  ghost: 'bg-transparent text-foreground hover:bg-primary-50',
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm rounded-md',
  md: 'h-10 px-5 text-sm rounded-lg',
  lg: 'h-12 px-8 text-base rounded-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
