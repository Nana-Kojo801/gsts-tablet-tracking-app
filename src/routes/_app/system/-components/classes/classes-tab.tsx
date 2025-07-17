import { useState } from 'react'
import ClassDialog from './class-dialog'
import type { Class } from '@/types'
import type { DialogState } from './types'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'

const ClassesTab = () => {
  const { classes } = useAppData()

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    classObj: null,
  })

  // Helper functions
  const openDialog = (
    action: 'add' | 'edit' | 'delete',
    classObj: Class | null = null,
  ) => {
    setDialogState({ open: true, action, classObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, classObj: null })
  }

  return (
    <div>
      <EntityTable<Class>
        searchPlaceholder="Search classes..."
        entries={classes}
        entriesSize={classes.length}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[{ key: 'name', label: 'Class' }]}
        search={(searchQuery, entry) =>
          entry.name.toLowerCase().includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd: () => openDialog('add'),
          onEdit: (item) => openDialog('edit', item),
          onDelete: (item) => openDialog('delete', item),
        }}
      />
      <ClassDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}

export default ClassesTab
