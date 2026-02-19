import { cn } from '@/lib/utils'

export function Select({
  className,
  children,
  error,
  id,
  ...props
}: React.ComponentProps<'select'> & { error?: string }) {
  return (
    <>
      <select
        id={id}
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && id ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && id && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </>
  )
}
