import { useAppData, getPendingSubmissionStudents } from "@/hooks/use-app-data"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

function isToday(date: number) {
  const d = new Date(date)
  const now = new Date()
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
}

const DashboardStats = () => {
  const { submissions, tablets, students } = useAppData()

  // Today's submissions
  const todaysSubmissions = submissions.filter((s) => isToday(s.submissionTime))
  const collectedToday = todaysSubmissions.length

  // Missing devices for today: submissions with condition === 'Missing'
  const missingDevices = tablets.filter((s) => s.status === 'lost').length

  // Pending submissions for today: use school policy
  const pendingCollections = getPendingSubmissionStudents(new Date(), students, submissions).length

  const summaryStats = [
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
      desc: "Awaiting return (today)",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
