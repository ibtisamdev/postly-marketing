import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<'input'> & {
  error?: string
}

export function Input({ error, className, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500' : 'border-border',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && id ? `${id}-error` : undefined}
        {...props}
      />
      {error && id && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
