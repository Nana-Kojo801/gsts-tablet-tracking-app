import { useState } from 'react'
import type { User } from '@/types'
import type { DialogState } from './types'
import UserDialog from './user-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'

const UsersTab = () => {
  const { users } = useAppData()

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    userObj: null,
  })

  // Helper functions
  const openDialog = (
    action: 'add' | 'edit' | 'delete',
    userObj: User | null = null,
  ) => {
    setDialogState({ open: true, action, userObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, userObj: null })
  }

  return (
    <div>
      <EntityTable<User>
        searchPlaceholder="Search users..."
        entries={users}
        entriesSize={users.length}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[{ key: 'name', label: 'User' }, { key: 'role', label: 'Role' }]}
        search={(searchQuery, entry) =>
          entry.name.toLowerCase().includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd: () => openDialog('add'),
          onEdit: (item) => openDialog('edit', item),
          onDelete: (item) => openDialog('delete', item),
        }}
      />
      <UserDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}

export default UsersTab 