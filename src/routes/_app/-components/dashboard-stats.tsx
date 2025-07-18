import { useAppData } from '@/hooks/use-app-data'
import { Users, Smartphone, ArrowUpCircle, UserX } from 'lucide-react'

export interface DashboardStatsProps {
  totalStudents: number
  totalTablets: number
  distributedToday: number
  pendingCollections: number
}

export function DashboardStats() {
  const {
    students,
    tablets,
    distributions
  } = useAppData()

  // Calculate real stats
  const totalStudents = students.length
  const totalTablets = tablets.length
  const distributedToday = distributions.filter((d) => {
    const date = new Date(d.distributionTime)
    const now = new Date()
    return date.toDateString() === now.toDateString()
  }).length
  const pendingCollections = tablets.filter(
    (t) => t.distributed && t.status !== 'lost',
  ).length

  const stats = [
    {
      label: 'Students',
      value: totalStudents,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-500/10',
      desc: 'Total registered students',
    },
    {
      label: 'Tablets',
      value: totalTablets,
      icon: <Smartphone className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-500/10',
      desc: 'Total tablets in inventory',
    },
    {
      label: 'Distributed Today',
      value: distributedToday,
      icon: <ArrowUpCircle className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-500/10',
      desc: 'Tablets handed out today',
    },
    {
      label: 'Pending Collections',
      value: pendingCollections,
      icon: <UserX className="w-6 h-6 text-yellow-600" />,
      iconBg: 'bg-yellow-500/10',
      desc: 'Tablets not yet returned',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
