import { cn } from '@/lib/utils'

type BadgeProps = React.ComponentProps<'span'> & {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'destructive'
}

const variantClasses = {
  default: 'bg-primary-50 text-primary-700',
  outline: 'border border-border text-foreground',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  destructive: 'bg-red-50 text-red-700',
}

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
