import { createFileRoute } from '@tanstack/react-router'
import { useAppData } from '@/hooks/use-app-data'
import { useState, useMemo } from 'react'
import { Gift, Inbox } from 'lucide-react'
import EntityTable from '@/components/entity-table/entity-table'

export const Route = createFileRoute('/_app/reports/recent-activties/')({
  component: RecentActivities,
})

const PAGE_SIZE = 10

function RecentActivities() {
  const { submissions, classes, programmes } = useAppData()
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedProgramme, setSelectedProgramme] = useState('all')

  // Compose all activities
  const allActivities = useMemo(
    () =>
      [
        ...submissions.map((s) => ({
          type: 'submission',
          name: s.student?.name || 'Unknown Student',
          class: s.student?.class || '',
          programme: s.student?.programme || '',
          date: s.submissionTime,
          _id: s._id,
        })),
      ].sort((a, b) => b.date - a.date),
    [submissions],
  )

  // Filtered activities
  const filteredActivities = useMemo(() => {
    return allActivities.filter((a) => {
      const classMatch = selectedClass === 'all' || a.class === selectedClass
      const typeMatch = selectedType === 'all' || a.type === selectedType
      const programmeMatch =
        selectedProgramme === 'all' || a.programme === selectedProgramme
      return classMatch && typeMatch && programmeMatch
    })
  }, [allActivities, selectedClass, selectedType, selectedProgramme])

  // EntityTable columns
  const columns = [
    { key: 'type', label: 'Type' },
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

  // Search function
  const search = (query: string, entry: any) => {
    const q = query.toLowerCase()
    return (
      entry.name.toLowerCase().includes(q) ||
      entry.class.toLowerCase().includes(q) ||
      entry.programme.toLowerCase().includes(q) ||
      (entry.type === 'distribution' ? 'distribution' : 'submission').includes(
        q,
      )
    )
  }

  // Filters for EntityTable
  const filters = [
    {
      label: 'Class',
      value: selectedClass,
      options: [
        { value: 'all', label: 'All Classes' },
        ...classes.map((c) => ({ value: c.name, label: c.name })),
      ],
      onChange: setSelectedClass,
    },
    {
      label: 'Type',
      value: selectedType,
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'submission', label: 'Submission' },
        { value: 'distribution', label: 'Distribution' },
      ],
      onChange: setSelectedType,
    },
    {
      label: 'Programme',
      value: selectedProgramme,
      options: [
        { value: 'all', label: 'All Programmes' },
        ...programmes.map((p) => ({ value: p.name, label: p.name })),
      ],
      onChange: setSelectedProgramme,
    },
  ]

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-4 w-full">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        All Recent Activities
      </h1>
      <EntityTable
        searchPlaceholder="Search activities..."
        entries={filteredActivities}
        getRowId={(entry) => entry._id}
        entriesSize={filteredActivities.length}
        pageSize={PAGE_SIZE}
        columns={columns}
        dataActions={{}}
        showDataActions={false}
        search={search}
        renderData={renderData}
        filters={filters}
      />
    </div>
  )
}
