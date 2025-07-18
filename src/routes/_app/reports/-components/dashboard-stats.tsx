import { useAppData } from "@/hooks/use-app-data"
import { ClipboardList, CheckCircle, Clock, AlertCircle, Users, Tablet } from "lucide-react"

const DashboardStats = () => {
  const {
    tablets,
    students,
    submissions,
    distributions
  } = useAppData()
  const missingDevices = tablets.filter((t) => t.status === 'lost').length
  const pendingCollections = tablets.filter(
    (t) => t.distributed && t.status !== 'lost',
  ).length
  const summaryStats = [
    {
      label: 'Total Submissions',
      value: submissions.length,
      icon: <ClipboardList className="w-6 h-6 text-primary" />,
      iconBg: 'bg-primary/10',
      desc: 'All collection records',
    },
    {
      label: 'Total Distributions',
      value: distributions.length,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-500/10',
      desc: 'Tablets distributed in range',
    },
    {
      label: 'Pending Collections',
      value: pendingCollections,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      iconBg: 'bg-yellow-500/10',
      desc: 'Tablets out, not yet submitted',
    },
    {
      label: 'Missing Devices',
      value: missingDevices,
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      iconBg: 'bg-red-500/10',
      desc: 'Marked as missing',
    },
    {
      label: 'Total Students',
      value: students.length,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-500/10',
      desc: 'Students in filter',
    },
    {
      label: 'Total Tablets',
      value: tablets.length,
      icon: <Tablet className="w-6 h-6 text-muted-foreground" />,
      iconBg: 'bg-muted/10',
      desc: 'All tablets in system',
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
