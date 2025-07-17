import { summaryStats } from "../-mock-data"

const DashboardStats = () => {
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
