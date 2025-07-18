import { useAppData } from "@/hooks/use-app-data"
import { ClipboardList, CheckCircle, Clock, AlertCircle } from "lucide-react"

const DashboardStats = () => {
  const { submissions, tablets } = useAppData()

  // Calculate real stats
  const totalSubmissions = submissions.length
  const today = new Date()
  const collectedToday = submissions.filter((s) => {
    const date = new Date(s.submissionTime)
    return date.toDateString() === today.toDateString()
  }).length
  const pendingCollections = tablets.filter(
    (t) => t.distributed && t.status !== "lost"
  ).length
  const missingDevices = tablets.filter((t) => t.status === "lost").length

  const summaryStats = [
    {
      label: "Total Submissions",
      value: totalSubmissions,
      icon: <ClipboardList className="w-6 h-6 text-primary" />,
      iconBg: "bg-primary/10",
      desc: "All submission records",
    },
    {
      label: "Submitted Today",
      value: collectedToday,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      iconBg: "bg-green-500/10",
      desc: "Tablets submitted today",
    },
    {
      label: "Pending Submissions",
      value: pendingCollections,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      iconBg: "bg-yellow-500/10",
      desc: "Awaiting return",
    },
    {
      label: "Missing Devices",
      value: missingDevices,
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      iconBg: "bg-red-500/10",
      desc: "Marked as missing",
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
