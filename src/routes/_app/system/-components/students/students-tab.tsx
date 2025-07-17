import { useState } from 'react'
import type { Student } from '@/types'
import type { DialogState } from './types'
import StudentDialog from './student-dialog'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'

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