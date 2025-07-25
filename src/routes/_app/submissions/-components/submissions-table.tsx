import type { Submissions } from '@/types'
import EntityTable from '@/components/entity-table/entity-table'
import { useAppData } from '@/hooks/use-app-data'
import { Calendar, Shield, UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface SubmissionsTableProps {
  onAdd: () => void
  onDelete: (item: Submissions) => void
}

const SubmissionsTable = ({
  onAdd,
  onDelete,
}: SubmissionsTableProps) => {
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
          { key: 'class', label: 'Class'},
          { key: 'receivedBy', label: 'Received By' },
          { key: 'condition', label: 'Condition' },
          { key: 'submissionTime', label: 'Submission Time' },
        ]}
        renderData={({ column, entry, defaultData }) => {
          if (column.key === 'student') {
            return <span>{entry.student.name}</span>
          }
          if(column.key === 'class') {
            return <span>{entry.student.class}</span>
          }
          if (column.key === 'receivedBy') {
            const isAdmin = entry.receivedBy.role
            return <Badge
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
                <span className="capitalize tracking-wide">{entry.receivedBy.name}</span>
              </Badge>
          }
          if (column.key === 'condition') {
            if (entry.condition === 'Good') {
              return (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                  Good
                </span>
              )
            }
            if (entry.condition === 'Bad') {
              return (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                  Bad
                </span>
              )
            }
            return <span className="text-muted-foreground">Unknown</span>
          }
          if (column.key === 'submissionTime') {
            return (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  {new Date(entry.submissionTime).toLocaleTimeString()}
                </span>
              </div>
            )
          }
          return defaultData
        }}
        search={(searchQuery, entry) =>
          entry.student.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          entry.receivedBy?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd,
          onDelete,
        }}
      />
    </div>
  )
}

export default SubmissionsTable
