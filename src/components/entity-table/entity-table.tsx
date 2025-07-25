import { Download, Plus, Search, Upload } from 'lucide-react'
import DataTable from './data-table'
import { Input } from '../ui/input'
import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select'

export type RenderDataType<T, IdType> = (props: {
  column: EntityTableProps<T, IdType>['columns'][0]
  entry: T
  defaultData: string
}) => string | React.ReactNode

export interface EntityTableProps<T, IdType = unknown> {
  searchPlaceholder: string
  entries: T[]
  getRowId: (entry: T) => IdType
  pageSize: number
  columns: { key: keyof T | string; label: string }[]
  searchTerms: { term?: (entry: T) => string; key?: keyof T }[]
  showDataActions?: boolean
  dataActions: {
    onAdd?: () => void
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    onImport?: () => void
    onExport?: (entries: T[]) => void
  }
  renderData?: RenderDataType<T, IdType>
  filters?: {
    [key: string]: {
      key: keyof T
      customValue?: (entry: T, value: any) => boolean
      options: { label: string; value: any }[]
    }
  }
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

const EntityTable = <T, IdType = unknown>({
  entries,
  getRowId,
  pageSize,
  columns,
  dataActions,
  showDataActions = true,
  searchPlaceholder,
  searchTerms,
  renderData = ({ defaultData }) => defaultData,
  filters = {},
}: EntityTableProps<T, IdType>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState(
    filters
      ? Object.fromEntries(
          Object.entries(filters).map((entry) => [
            entry[1].key,
            entry[1].options[0].value,
          ]),
        )
      : {},
  )
  console.log(filter);
  
  const filteredEntries = useMemo(() => entries
    .filter((entry) => {
      let count = 0
      for (const key in filter) {
        if (filters[key].customValue) {
          if (filters[key].customValue(entry, filter[key])) count++
        } else {
          const value = filter[key]
          if (!value) count++
          else if ((entry as any)[key] === value) {
            count++
          }
        }
      }
      return count === Object.keys(filter).length
    }).filter((entry) => {
      let count = 0
      searchTerms.forEach((term) => {
        const value = term.term
          ? term.term(entry)
          : (entry[term.key!] as string)
        if (value.toLowerCase().includes(searchQuery.toLowerCase())) count += 1
      })
      return count > 0
    }), [entries, filter, searchQuery])

  const [page, setPage] = useState(1)
  const paginatedEntries = filteredEntries.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )
  const totalPages = Math.ceil(filteredEntries.length / pageSize)
  const hasMore = page < totalPages

  // Reset to page 1 if entries change
  // (optional: can add useEffect for this if needed)

  return (
    <div className="space-y-4">
      {/* Search, Filters, and Actions */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-3 items-center">
            {/* Filters */}
            {/* Search */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {Object.keys.length > 0 && (
              <div className="flex gap-2">
                {Object.entries(filters).map(([key, filters]) => {
                  return (
                    <Select
                      key={key}
                      value={filter[filters.key as string]}
                      onValueChange={(value) => {
                        setFilter((prev) => ({ ...prev, [filters.key]: value }))
                      }}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder={filter.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.options.map((opt, index) => (
                          <SelectItem key={index} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                })}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center justify-end">
            {dataActions.onImport && (
              <Button
                onClick={dataActions.onImport}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </Button>
            )}
            {dataActions.onExport && (
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            )}
            {dataActions.onAdd && (
              <Button
                className="flex items-center space-x-2"
                onClick={() => dataActions.onAdd!()}
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable<T>
        actions={dataActions}
        showDataActions={showDataActions}
        entries={paginatedEntries}
        columns={columns}
        getRowId={getRowId}
        renderData={renderData}
      />

      {/* Pagination */}
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
                className={
                  p === page ? 'bg-primary text-primary-foreground' : ''
                }
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
    </div>
  )
}

export default EntityTable
