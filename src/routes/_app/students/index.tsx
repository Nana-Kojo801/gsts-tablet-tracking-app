import { createFileRoute } from '@tanstack/react-router'
import type { Student } from '@/types'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import { TabletIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_app/students/')({
  component: StudentsManagement,
})

function StudentsManagement() {
  const { students, classes, programmes } = useAppData()

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
          searchPlaceholder="Search by name, imei..."
          entries={students}
          filters={{
            programmeId: {
              key: 'programmeId',
              options: [
                { label: 'All programmes', value: null },
                ...programmes.map((p) => ({ value: p._id, label: p.name })),
              ],
            },
            classId: {
              key: 'classId',
              options: [
                { label: 'All Classes', value: null },
                ...classes.map((c) => ({ value: c._id, label: c.name })),
              ],
            },
            status: {
              key: 'status',
              options: [
                { value: null, label: 'All Statuses' },
                { value: 'Day', label: 'Day' },
                { value: 'Boarder', label: 'Boarder' },
              ],
            },
            tablet: {
              key: 'tablet',
              customValue: (student, received) =>
                received === null
                  ? true
                  : received === true
                    ? student.tablet
                      ? true
                      : false
                    : !student.tablet
                      ? true
                      : false,
              options: [
                { label: 'All Tablets', value: null },
                { label: 'Received', value: true },
                { label: 'Not Received', value: false },
              ],
            },
          }}
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
          searchTerms={[{ key: 'name' }, { key: 'class' }, { term: (entry) => entry.tablet.imei }]}
          dataActions={{}}
          showDataActions={false}
        />
      </div>
    </div>
  )
}
