import { useAppData, getPendingSubmissionStudents } from '@/hooks/use-app-data'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#22c55e', '#facc15'] // green, yellow

interface NonComplianceTrendsChartProps {
  date: Date
  selectedClass: string
  selectedStatus: string
}

export default function NonComplianceTrendsChart({
  date,
  selectedClass,
  selectedStatus,
}: NonComplianceTrendsChartProps) {
  const { students, submissions, confiscations } = useAppData()
  // Filter students by class and status
  const filteredStudents = students.filter(
    (s) =>
      s.tablet &&
      (selectedClass === 'all' || s.class === selectedClass) &&
      (selectedStatus === 'all' || s.status === selectedStatus),
  )

  const pending = getPendingSubmissionStudents(
    date,
    filteredStudents,
    submissions,
    confiscations,
  ).length
  const submitted = filteredStudents.length - pending
  const data = [
    { name: 'Submitted', value: submitted },
    { name: 'Pending', value: pending },
  ]

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl min-h-[350px]">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Non-Compliance Trends
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label={({ name, percent }) => {
              const pct = percent ?? 0
              return `${name} (${(pct * 100).toFixed(0)}%)`
            }}
          >
            {data.map((entry, idx) => (
              <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => v} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
