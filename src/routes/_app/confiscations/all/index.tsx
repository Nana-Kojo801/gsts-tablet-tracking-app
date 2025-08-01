import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import type { Confiscation, Student } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/_app/confiscations/all/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { confiscations, classes } = useAppData()

  const modifiedConfiscations = useMemo(() => {
    const map = new Map<Student['_id'], Confiscation>()
    confiscations.forEach((confiscation) => {
      if (!map.has(confiscation.student._id)) {
        map.set(confiscation.student._id, confiscation)
      }
    })
    return Array.from(map.values())
  }, [confiscations])

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Device Confiscations Records
          </h1>
          <p className="text-muted-foreground text-lg">
            View all confiscation records and history
          </p>
        </div>
      </div>
      <EntityTable<Confiscation>
        entries={modifiedConfiscations}
        getRowId={(entry) => entry._id}
        pageSize={100}
        filters={{
          classId: {
            key: 'classId',
            label: 'Class',
            customValue: (entry, value) =>
              value === null ? true : entry.student.classId === value,
            options: [
              { label: 'All Classes', value: null },
              ...classes.map((c) => ({ value: c._id, label: c.name })),
            ],
          },
          status: {
            key: 'status',
            label: 'Status',
            customValue: (entry, value) =>
              value === null ? true : entry.student.status === value,
            options: [
              { label: 'All', value: null },
              { label: 'Day', value: 'Day' },
              { label: 'Boarder', value: 'Boarder' },
            ],
          },
        }}
        columns={[
          { key: 'name', label: 'Student' },
          { key: 'class', label: 'Class' },
          { key: 'imei', label: 'Imei' },
          { key: 'history', label: 'History' },
        ]}
        renderData={({ column, defaultData, entry }) => {
          if (column.key === 'name') return entry.student.name
          if (column.key === 'class') return entry.student.class
          if (column.key === 'imei') return entry.student.tablet?.imei || 'N/A'
          return defaultData
        }}
        searchPlaceholder="Search by name, index number, imei..."
        searchTerms={[
          { term: (entry) => entry.student.name },
          { term: (entry) => entry.student.indexNumber },
          { term: (entry) => entry.student.tablet?.imei || '' },
        ]}
        showDataActions={false}
        dataActions={{}}
      />
    </div>
  )
}
