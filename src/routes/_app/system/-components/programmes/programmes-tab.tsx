import { useState } from 'react'
import type { DialogState } from './types'
import ProgrammeDialog from './programme-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import type { Programme } from '@/types'

const ProgrammesTab = () => {
  const { programmes } = useAppData()

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    programmeObj: null,
  })

  // Helper functions
  const openDialog = (
    action: 'add' | 'edit' | 'delete',
    programmeObj: Programme | null = null,
  ) => {
    setDialogState({ open: true, action, programmeObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, programmeObj: null })
  }

  return (
    <div>
      <EntityTable<Programme>
        searchPlaceholder="Search programmes..."
        entries={programmes}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[{ key: 'name', label: 'Programme' }]}
        searchTerms={[{ key: 'name' }]}
        dataActions={{
          onAdd: () => openDialog('add'),
          onEdit: (item) => openDialog('edit', item),
          onDelete: (item) => openDialog('delete', item),
        }}
      />
      <ProgrammeDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}

export default ProgrammesTab 