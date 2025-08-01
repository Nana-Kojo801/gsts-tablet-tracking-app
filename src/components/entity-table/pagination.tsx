import { Button } from '../ui/button'

type PaginationProps<T> = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  entries: T[]
  filteredEntries: T[]
}

function getPaginationRange(current: number, total: number, delta = 2) {
  const range = []
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i)
  }
  if (current - delta > 2) range.unshift('...')
  if (current + delta < total - 1) range.push('...')
  range.unshift(1)
  if (total > 1) range.push(total)
  return Array.from(new Set(range))
}

const Pagination = <T,>({
  pageSize,
  page,
  setPage,
  entries,
  filteredEntries,
}: PaginationProps<T>) => {
  const totalPages = Math.ceil(filteredEntries.length / pageSize)
  const hasMore = page < totalPages
  return (
    <div className="flex items-center justify-between bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
      <div className="text-sm text-muted-foreground">
        Showing{' '}
        <span className="font-semibold text-foreground">
          {(page - 1) * pageSize + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold text-foreground">
          {Math.min(page * pageSize, entries.length)}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-foreground">
          {filteredEntries.length}
        </span>{' '}
        entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="border-border/50 hover:bg-muted/50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        {/* Page numbers with ellipsis */}
        {getPaginationRange(page, totalPages).map((p) =>
          p === '...' ? (
            <span key={p} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={p}
              size="sm"
              variant={p === page ? 'default' : 'outline'}
              className={p === page ? 'bg-primary text-primary-foreground' : ''}
              onClick={() => setPage(Number(p))}
            >
              {p}
            </Button>
          ),
        )}
        <Button
          variant="outline"
          size="sm"
          className="border-border/50 hover:bg-muted/50"
          disabled={!hasMore}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
