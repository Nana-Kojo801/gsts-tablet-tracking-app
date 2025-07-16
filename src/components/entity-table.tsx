import * as React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export type EntityTableColumn<T> = {
  key: keyof T | string
  header: React.ReactNode
  render?: (row: T) => React.ReactNode
  className?: string
}

export type EntityTableProps<T> = {
  columns: EntityTableColumn<T>[]
  data: T[]
  selected: string[]
  onSelect: (id: string) => void
  onSelectAll: () => void
  getRowId: (row: T) => string
  rowActions?: (row: T) => React.ReactNode
  bulkActions?: React.ReactNode
  showCheckbox?: boolean
  className?: string
}

export function EntityTable<T extends Record<string, any>>({
  columns,
  data,
  selected,
  onSelect,
  onSelectAll,
  getRowId,
  rowActions,
  bulkActions,
  showCheckbox = true,
  className,
}: EntityTableProps<T>) {
  return (
    <div className={className}>
      {selected.length > 0 && bulkActions && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm mb-2">
          {bulkActions}
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckbox && (
              <TableHead>
                <input
                  type="checkbox"
                  checked={selected.length === data.length && data.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </TableHead>
            )}
            {columns.map((col, i) => (
              <TableHead key={col.key as string} className={col.className}>{col.header}</TableHead>
            ))}
            {rowActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => {
            const id = getRowId(row)
            return (
              <TableRow key={id} className={idx % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}>
                {showCheckbox && (
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selected.includes(id)}
                      onChange={() => onSelect(id)}
                      className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key as string} className={col.className}>
                    {col.render ? col.render(row) : row[col.key as keyof T]}
                  </TableCell>
                ))}
                {rowActions && <TableCell>{rowActions(row)}</TableCell>}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
} 