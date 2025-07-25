import { useState } from 'react'
import type { Tablet } from '@/types'
import type { DialogState } from './types'
import TabletDialog from './tablet-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import { Badge } from '@/components/ui/badge'
import { Check, AlertTriangle } from 'lucide-react'

const TabletsTab = () => {
  const { tablets } = useAppData()

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    tabletObj: null,
  })


  // Helper functions
  const openDialog = (
    action: 'add' | 'edit' | 'delete',
    tabletObj: Tablet | null = null,
  ) => {
    setDialogState({ open: true, action, tabletObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, tabletObj: null })
  }

  return (
    <div>
      <EntityTable<Tablet>
        searchPlaceholder="Search by imei, bag no..."
        entries={tablets}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[
          { key: 'imei', label: 'IMEI' },
          { key: 'bagNumber', label: 'Bag Number' },
          { key: 'status', label: 'Status' },
        ]}
        renderData={({ column, entry, defaultData }) => {
          if (column.key === 'status') {
            if (entry.status === 'active') {
              return (
                <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border bg-green-500/10 border-green-500 text-green-700">
                  <Check className="w-4 h-4 mr-1 text-green-600" />
                  Active
                </Badge>
              )
            } else if (entry.status === 'lost') {
              return (
                <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border bg-red-500/10 border-red-500 text-red-700">
                  <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />
                  Lost
                </Badge>
              )
            }
          }
          return defaultData
        }}
        searchTerms={[{ key: 'imei' }, { key: 'bagNumber' }]}
        dataActions={{
          onAdd: () => openDialog('add'),
          onEdit: (item) => openDialog('edit', item),
          onDelete: (item) => openDialog('delete', item),
        }}
        filters={{
          status: {
            key: 'status',
            options: [
              { label: 'All', value: null },
              { label: 'Active', value: 'active' },
              { label: 'Lost', value: 'lost' },
            ],
          },
        }}
      />
      <TabletDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}

export default TabletsTab
