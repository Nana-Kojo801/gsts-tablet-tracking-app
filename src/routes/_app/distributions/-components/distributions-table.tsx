import { useAppData } from '@/hooks/use-app-data'
import EntityTable from '@/components/entity-table/entity-table'
import { Calendar } from 'lucide-react'

interface DistributionsTableProps {
  onAdd: () => void
  onDelete: (item: any) => void
}

const DistributionsTable = ({ onAdd, onDelete }: DistributionsTableProps) => {
  const { distributions } = useAppData()

  return (
    <div>
      <EntityTable
        searchPlaceholder="Search distributions..."
        entries={distributions}
        entriesSize={distributions.length}
        pageSize={100}
        getRowId={(item) => item._id}
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'distributedBy', label: 'Distributed By' },
          { key: 'distributionTime', label: 'Distribution Time' },
        ]}
        renderData={({ column, entry, defaultData }) => {
          if (column.key === 'student') {
            return <span>{entry.student.name}</span>
          }
          if (column.key === 'distributedBy') {
            return <span>{entry.distributedBy?.name || 'Unknown'}</span>
          }
          if (column.key === 'distributionTime') {
            return (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(entry.distributionTime).toLocaleDateString()}</span>
              </div>
            )
          }
          return defaultData
        }}
        search={(searchQuery, entry) =>
          entry.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.distributedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        }
        dataActions={{
          onAdd,
          onDelete,
        }}
      />
    </div>
  )
}

export default DistributionsTable 