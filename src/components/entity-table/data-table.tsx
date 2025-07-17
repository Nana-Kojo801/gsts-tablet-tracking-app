import { Button } from '../ui/button'
import { Edit, Trash2 } from 'lucide-react'

type DataTableProps<T, IdType = unknown> = {
  entries: T[]
  getRowId: (entry: T) => IdType
  columns: { key: keyof T; label: string }[]
  onEdit: (classObj: T) => void
  onDelete: (classObj: T) => void
}

const DataTable = <T, IdType = unknown>({
  entries,
  columns,
  getRowId,
  onEdit,
  onDelete,
}: DataTableProps<T, IdType>) => {
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b border-border/50">
              {columns.map(column => (
                <th key={String(column.key)} className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    {column.label}
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left">
                <span className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {entries.map((entry, index) => (
              <tr
                key={String(getRowId(entry))}
                className={`hover:bg-muted/40 transition-all duration-200 ${index % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}
              >
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 font-semibold text-foreground text-sm">
                    {String(entry[col.key])}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      onClick={() => onEdit(entry)}
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      onClick={() => onDelete(entry)}
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
