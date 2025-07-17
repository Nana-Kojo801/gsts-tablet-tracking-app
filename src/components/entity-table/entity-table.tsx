import { Download, Plus, Search, Upload } from 'lucide-react'
import DataTable from './data-table'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Button } from '../ui/button'

interface EntityTableProps<T, IdType = unknown> {
  searchPlaceholder: string
  entries: T[]
  getRowId: (entry: T) => IdType
  entriesSize: number
  pageSize: number
  columns: { key: keyof T; label: string }[]
  search: (searchQuery: string, entry: T) => boolean
  dataActions: {
    onAdd: () => void
    onEdit: (item: T) => void
    onDelete: (item: T) => void
  }
}

const EntityTable = <T, IdType = unknown>({
  entries,
  getRowId,
  entriesSize,
  pageSize,
  columns,
  dataActions,
  searchPlaceholder,
  search,
}: EntityTableProps<T, IdType>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const paginatedEntries = entries
    .filter((c) => search(searchQuery, c))
    .slice((page - 1) * pageSize, page * pageSize)
  const hasMore = page * pageSize < entries.length

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-3 items-center">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button
              className="flex items-center space-x-2"
              onClick={() => dataActions.onAdd()}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <DataTable<T>
        onEdit={(dataObj) => dataActions.onEdit(dataObj)}
        onDelete={(dataObj) => dataActions.onDelete(dataObj)}
        entries={paginatedEntries}
        columns={columns}
        getRowId={getRowId}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1</span> to{' '}
          <span className="font-semibold text-foreground">
            {entries.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-foreground">{entriesSize}</span>{' '}
          classes
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
          <Button size="sm" className="bg-primary text-primary-foreground">
            {page}
          </Button>
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
