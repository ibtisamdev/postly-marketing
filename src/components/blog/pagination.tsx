import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath?: string
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = '/blog',
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Button
          href={
            currentPage === 2
              ? basePath
              : `${basePath}?page=${currentPage - 1}`
          }
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      )}
      <span className="px-3 text-sm text-muted">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Button
          href={`${basePath}?page=${currentPage + 1}`}
          variant="outline"
          size="sm"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  )
}
