import { useAppData } from '@/hooks/use-app-data'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'

const COLORS = ['#22c55e', '#ef4444'] // green for Good, red for Bad

interface TabletConditionAnalyticsChartProps {
  date: Date
  selectedClass: string
  selectedStatus: string
}

export default function TabletConditionAnalyticsChart({ date, selectedClass, selectedStatus }: TabletConditionAnalyticsChartProps) {
  const { students, submissions } = useAppData()
  // Filter students by class and status
  const filteredStudents = students.filter((s) =>
    (selectedClass === 'all' || s.class === selectedClass) &&
    (selectedStatus === 'all' || s.status === selectedStatus)
  )
  const dateStr = dayjs(date).format('YYYY-MM-DD')
  const filteredSubmissions = submissions.filter((s) =>
    dayjs(s.submissionTime).format('YYYY-MM-DD') === dateStr &&
    filteredStudents.some((stu) => stu._id === s.studentId)
  )
  const good = filteredSubmissions.filter((s) => s.condition === 'Good').length
  const bad = filteredSubmissions.filter((s) => s.condition === 'Bad').length
  const data = [
    { name: 'Good', value: good },
    { name: 'Bad', value: bad },
  ]

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl min-h-[350px]">
      <h2 className="text-lg font-semibold text-foreground mb-2">Tablet Condition Analytics</h2>
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
            label={({ name, percent }) =>
              percent !== undefined
                ? `${name} (${(percent * 100).toFixed(0)}%)`
                : name
            }
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