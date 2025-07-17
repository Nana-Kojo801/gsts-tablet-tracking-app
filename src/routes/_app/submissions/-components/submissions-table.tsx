import type { Submissions } from '@/types'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import { Calendar, User } from 'lucide-react'

interface SubmissionsTableProps {
  onAdd: () => void
  onEdit: (item: Submissions) => void
  onDelete: (item: Submissions) => void
}

const SubmissionsTable = ({ onAdd, onEdit, onDelete }: SubmissionsTableProps) => {
  const { submissions } = useAppData()

  return (
    <div>
      <EntityTable<Submissions>
        searchPlaceholder="Search submissions..."
        entries={submissions}
        entriesSize={submissions.length}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'receivedBy', label: 'Received By' },
          { key: 'submissionTime', label: 'Submission Time' },
        ]}
        renderData={({ column, entry, defaultData }) => {
          if (column.key === 'student') {
            return (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{entry.student.name}</span>
              </div>
            )
          }
          if (column.key === 'receivedBy') {
            return (
              <span>{entry.receivedBy?.name || 'Unknown'}</span>
            )
          }
          if (column.key === 'submissionTime') {
            return (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(entry.submissionTime).toLocaleDateString()}</span>
              </div>
            )
          }
          return defaultData
        }}
        search={(searchQuery, entry) =>
          entry.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.receivedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd,
          onEdit,
          onDelete,
        }}
      />
    </div>
  )
}

export default SubmissionsTable
