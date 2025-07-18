import { useAppData } from '@/hooks/use-app-data'
import { Gift, GraduationCap, Calendar, Hourglass } from 'lucide-react'
import dayjs from 'dayjs'

const DashboardStats = () => {
  const { distributions, students } = useAppData()

  // Calculate stats
  const totalDistributions = distributions.length
  const studentsWithTablets = students.filter(s => s.tablet && s.tablet.distributed).length
  const today = dayjs().startOf('day')
  const distributionsToday = distributions.filter(d => {
    return dayjs(d.distributionTime).isSame(today, 'day')
  }).length
  const pendingDistributions = students.filter(s => s.tablet && !s.tablet.distributed).length

  const summaryStats = [
    {
      label: 'Total Distributions',
      value: totalDistributions,
      icon: <Gift className="w-6 h-6 text-primary" />, // consistent
      iconBg: 'bg-primary/10',
      desc: 'Total tablets distributed',
    },
    {
      label: 'Students with Tablets',
      value: studentsWithTablets,
      icon: <GraduationCap className="w-6 h-6 text-green-600" />, // consistent
      iconBg: 'bg-green-500/10',
      desc: 'Students who have received tablets',
    },
    {
      label: 'Distributions Today',
      value: distributionsToday,
      icon: <Calendar className="w-6 h-6 text-blue-600" />, // consistent
      iconBg: 'bg-blue-500/10',
      desc: 'Tablets distributed today',
    },
    {
      label: 'Pending Distributions',
      value: pendingDistributions,
      icon: <Hourglass className="w-6 h-6 text-yellow-600" />, // consistent
      iconBg: 'bg-yellow-500/10',
      desc: 'Students yet to receive tablets',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryStats.map((stat, idx) => (
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
              className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center scale-100 hover:scale-110 transition-transform duration-200`}
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