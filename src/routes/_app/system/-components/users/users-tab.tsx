import { useState } from 'react'
import type { User } from '@/types'
import type { DialogState } from './types'
import UserDialog from './user-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import { Badge } from '@/components/ui/badge'
import { User as UserIcon, Shield } from 'lucide-react'

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
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[
          { key: 'name', label: 'User' },
          { key: 'role', label: 'Role' },
          { key: 'password', label: 'Password' }
        ]}
        renderData={({ column, entry, defaultData }) => {
          if (column.key === 'role') {
            const isAdmin = entry.role === 'admin'
            return (
              <Badge
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border ${
                  isAdmin
                    ? 'bg-red-500/10 border-red-500 text-red-600'
                    : 'bg-blue-500/10 border-blue-500 text-blue-600'
                } backdrop-blur-sm`}
              >
                {isAdmin ? (
                  <Shield className="w-4 h-4 mr-1 text-red-500/80" />
                ) : (
                  <UserIcon className="w-4 h-4 mr-1 text-blue-500/80" />
                )}
                <span className="capitalize tracking-wide">{entry.role}</span>
              </Badge>
            )
          }
          return defaultData
        }}
        searchTerms={[{ key: 'name' }]}
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
