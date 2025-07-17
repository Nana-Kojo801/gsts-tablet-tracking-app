import { useState } from 'react'
import type { Student } from '@/types'
import type { DialogState } from './types'
import StudentDialog from './student-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import { Badge } from '@/components/ui/badge'
import { Tablet as TabletIcon } from 'lucide-react'

const StudentsTab = () => {
  const { students } = useAppData()
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    studentObj: null,
  })

  // Helper functions
  const openDialog = (
    action: 'add' | 'edit' | 'delete',
    studentObj: Student | null = null,
  ) => {
    setDialogState({ open: true, action, studentObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, studentObj: null })
  }

  return (
    <div>
      <EntityTable<Student>
        searchPlaceholder="Search students..."
        entries={students}
        entriesSize={students.length}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[
          { key: 'name', label: 'Student' },
          { key: 'programme', label: 'Programme' },
          { key: 'class', label: 'Class' },
          { key: 'tablet', label: 'Tablet' },
          { key: 'status', label: 'Status' }
        ]}
        renderData={({ column, entry, defaultData }) => {
          if (column.key === 'tablet') {
            if (entry.tabletId) {
              return (
                <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border bg-green-500/10 border-green-500 text-green-700">
                  <TabletIcon className="w-4 h-4 mr-1 text-green-600" />
                  Received
                </Badge>
              )
            } else {
              return (
                <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border bg-muted/40 border-border text-muted-foreground">
                  <span className="w-4 h-4 mr-1">—</span>
                  Not Received
                </Badge>
              )
            }
          }
          return defaultData
        }}
        search={(searchQuery, entry) =>
          entry.name.toLowerCase().includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd: () => openDialog('add'),
          onEdit: (item) => openDialog('edit', item),
          onDelete: (item) => openDialog('delete', item),
        }}
      />
      <StudentDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}

export default StudentsTab 