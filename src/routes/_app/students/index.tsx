import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import type { Student } from '@/types'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import StudentDialog from '../system/-components/students/student-dialog'
import { TabletIcon } from 'lucide-react'
import type { DialogState } from '../system/-components/students/types'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_app/students/')({
  component: StudentsManagement,
})

function StudentsManagement() {
  const { students, classes, programmes, tablets } = useAppData()

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    studentObj: null,
  })

  const [selectedProgramme, setSelectedProgramme] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedTablet, setSelectedTablet] = useState('all')

  // Compose tablet options
  const tabletOptions = useMemo(
    () => [
      { value: 'all', label: 'All Tablets' },
      ...tablets.map((t) => ({ value: t._id, label: t.imei })),
    ],
    [tablets],
  )

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const programmeMatch =
        selectedProgramme === 'all' || s.programmeId === selectedProgramme
      const classMatch = selectedClass === 'all' || s.classId === selectedClass
      const statusMatch =
        selectedStatus === 'all' || s.status === selectedStatus
      const tabletMatch =
        selectedTablet === 'all' || s.tabletId === selectedTablet
      return programmeMatch && classMatch && statusMatch && tabletMatch
    })
  }, [
    students,
    selectedProgramme,
    selectedClass,
    selectedStatus,
    selectedTablet,
  ])

  // Filters for EntityTable
  const filters = [
    {
      label: 'Programme',
      value: selectedProgramme,
      options: [
        { value: 'all', label: 'All Programmes' },
        ...programmes.map((p) => ({ value: p._id, label: p.name })),
      ],
      onChange: setSelectedProgramme,
    },
    {
      label: 'Class',
      value: selectedClass,
      options: [
        { value: 'all', label: 'All Classes' },
        ...classes.map((c) => ({ value: c._id, label: c.name })),
      ],
      onChange: setSelectedClass,
    },
    {
      label: 'Status',
      value: selectedStatus,
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Day', label: 'Day' },
        { value: 'Boarder', label: 'Boarder' },
      ],
      onChange: setSelectedStatus,
    },
    {
      label: 'Tablet',
      value: selectedTablet,
      options: tabletOptions,
      onChange: setSelectedTablet,
    },
  ]

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
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Students Management
          </h1>
          <p className="text-muted-foreground">
            Manage all students in the system
          </p>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <EntityTable<Student>
          searchPlaceholder="Search students..."
          entries={filteredStudents}
          entriesSize={filteredStudents.length}
          filters={filters}
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
      </div>
      <StudentDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}
