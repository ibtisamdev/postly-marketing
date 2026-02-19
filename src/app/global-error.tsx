'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white text-gray-900">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="mt-4 text-lg text-gray-600">
            {error.message || 'A critical error occurred.'}
          </p>
          <button
            onClick={reset}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
