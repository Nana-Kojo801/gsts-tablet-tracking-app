import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Student } from '@/types'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import StudentDialog from '../system/-components/students/student-dialog'
import { Button } from '@/components/ui/button'
import { Plus, TabletIcon, Upload } from 'lucide-react'
import type { DialogState } from '../system/-components/students/types'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_app/students/')({
  component: StudentsManagement,
})

function StudentsManagement() {
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
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            Student Management
          </h1>
          <p className="text-muted-foreground">
            Manage robotics club students and their tablet assignments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import Students</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

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
          { key: 'status', label: 'Status' },
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
