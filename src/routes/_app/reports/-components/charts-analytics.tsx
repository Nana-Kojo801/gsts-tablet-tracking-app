import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Pie,
  Cell,
  LineChart,
  PieChart,
} from 'recharts'

interface ChartsAnalyticsProps {
  chartData: any[]
  totalDistributionsInRange: number
  totalSubmissionsInRange: number
}

const ChartsAnalytics = ({ chartData, totalDistributionsInRange, totalSubmissionsInRange }: ChartsAnalyticsProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl flex flex-col gap-8 min-h-[350px] mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Distributions & Submissions Analytics
      </h2>
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Line Chart for Daily Trends */}
        <div className="flex-1 bg-muted/40 rounded-xl p-4 flex flex-col items-center justify-center min-w-0">
          <span className="text-xs text-muted-foreground mb-2">
            Daily Trends
          </span>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#a1a1aa"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                stroke="#a1a1aa"
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, background: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="distributions"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                name="Distributions"
              />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                name="Submissions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart for Proportions */}
        <div className="flex-1 bg-muted/40 rounded-xl p-4 flex flex-col items-center justify-center min-w-0">
          <span className="text-xs text-muted-foreground mb-2 block">
            Proportion in Range
          </span>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Distributions', value: totalDistributionsInRange },
                  { name: 'Submissions', value: totalSubmissionsInRange },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                label={({ name, percent }) =>
                  percent !== undefined
                    ? `${name} (${(percent * 100).toFixed(0)}%)`
                    : name
                }
              >
                <Cell key="Distributions" fill="#22c55e" />
                <Cell key="Submissions" fill="#3b82f6" />
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 8, background: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ChartsAnalytics 