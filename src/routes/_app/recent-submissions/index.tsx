import { createFileRoute } from '@tanstack/react-router'
import { useAppData } from '@/hooks/use-app-data'
import { useMemo } from 'react'
import { Gift, Inbox } from 'lucide-react'
import EntityTable from '@/components/entity-table/entity-table'

export const Route = createFileRoute('/_app/recent-submissions/')({
  component: RecentSubmissions,
})

const PAGE_SIZE = 20

function RecentSubmissions() {
  const { submissions, classes, programmes } = useAppData()

  // Compose all activities
  const allActivities = useMemo(
    () =>
      [
        ...submissions.map((s) => ({
          name: s.student.name,
          class: s.student.class,
          programme: s.student.programme,
          date: s.submissionTime,
          _id: s._id,
        })),
      ].sort((a, b) => b.date - a.date),
    [submissions],
  )

  // EntityTable columns
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'class', label: 'Class' },
    { key: 'programme', label: 'Programme' },
    { key: 'date', label: 'Date' },
  ]

  // Render custom data for type and date columns
  const renderData = ({ column, entry, defaultData }: any) => {
    if (column.key === 'type') {
      return entry.type === 'distribution' ? (
        <span className="inline-flex items-center gap-1 text-green-700">
          <Gift className="w-4 h-4" /> Distribution
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-blue-700">
          <Inbox className="w-4 h-4" /> Submission
        </span>
      )
    }
    if (column.key === 'date') {
      return new Date(entry.date).toLocaleString()
    }
    return defaultData
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-4 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        All Recent Activities
      </h1>
      <EntityTable
        searchPlaceholder="Search by name, class, programme..."
        entries={allActivities}
        getRowId={(entry) => entry._id}
        pageSize={PAGE_SIZE}
        columns={columns}
        dataActions={{}}
        showDataActions={false}
        searchTerms={[{ key: 'name' }, { key: 'class' }, { key: 'programme' }]}
        renderData={renderData}
        filters={{
          class: {
            key: 'class',
            label: 'Class',
            options: [
              { value: null, label: 'All Classes' },
              ...classes.map((c) => ({ value: c.name === '' ? 'Unassigned' : c.name, label: c.name })),
            ],
          },
          programme: {
            key: 'programme',
            label: 'Programme',
            options: [
              { value: null, label: 'All Programmes' },
              ...programmes.map((p) => ({ value: p.name, label: p.name })),
            ]
          }
        }}
      />
    </div>
  )
}
