import { useAppData } from '@/hooks/use-app-data'
import { Ban, CheckCircle, Tablet } from 'lucide-react'

const DashboardStats = () => {
  const { confiscations } = useAppData()

  const confiscatedCount = confiscations.filter(
    (c) => c.status === 'confiscated',
  ).length
  const returnedCount = confiscations.filter(
    (c) => c.status === 'returned',
  ).length
  const totalRecords = confiscations.length

  const stats = [
    {
      label: 'Currently Confiscated',
      value: confiscatedCount,
      icon: <Ban className="w-6 h-6 text-red-600" />,
      iconBg: 'bg-red-500/10',
      desc: 'Tablets currently held',
    },
    {
      label: 'Returned Devices',
      value: returnedCount,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-500/10',
      desc: 'Successfully returned',
    },
    {
      label: 'Total Records',
      value: totalRecords,
      icon: <Tablet className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-500/10',
      desc: 'All confiscation records',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl animate-in fade-in-10 duration-400`}
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div
              className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{stat.desc}</div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
