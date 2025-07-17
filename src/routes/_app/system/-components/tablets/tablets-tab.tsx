import { useState } from 'react'
import type { Tablet } from '@/types'
import type { DialogState } from './types'
import TabletDialog from './tablet-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'

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
        searchPlaceholder="Search tablets..."
        entries={tablets}
        entriesSize={tablets.length}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[
          { key: 'imei', label: 'IMEI' },
          { key: 'status', label: 'Status' },
        ]}
        search={(searchQuery, entry) =>
          entry.imei.toLowerCase().includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd: () => openDialog('add'),
          onEdit: (item) => openDialog('edit', item),
          onDelete: (item) => openDialog('delete', item),
        }}
      />
      <TabletDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}

export default TabletsTab
