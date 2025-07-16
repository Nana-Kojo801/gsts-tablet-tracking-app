import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Bell, 
  FileText, 
  Settings, 
  Clock,
  Users,
  Calendar,
  BarChart3,
  Eye,
  RefreshCw,
  Smartphone,
  UserX,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('day')

  // Mock data for demonstration
  const dashboardStats = {
    totalStudents: 45,
    totalTablets: 50,
    distributedToday: 42,
    collectedToday: 38,
    pendingCollections: 4
  }

  const complianceData = {
    distributed: 42,
    collected: 38,
    pending: 4,
    total: 45
  }

  return (
    <div className="w-full overflow-y-auto space-y-8 animate-in fade-in-20 slide-in-from-bottom-8 duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, Admin. Here's your tablet distribution overview for today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-40 bg-card/50 border-border/50">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: 'Robotics Club Students',
            value: dashboardStats.totalStudents,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            bg: 'bg-blue-500/10',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-600',
            desc: 'Total registered students',
          },
          {
            label: 'Available Tablets',
            value: dashboardStats.totalTablets,
            icon: <Smartphone className="w-6 h-6 text-green-600" />,
            bg: 'bg-green-500/10',
            iconBg: 'bg-green-500/10',
            iconColor: 'text-green-600',
            desc: 'Total tablets in inventory',
          },
          {
            label: 'Distributed Today',
            value: dashboardStats.distributedToday,
            icon: <ArrowUpCircle className="w-6 h-6 text-green-600" />,
            bg: 'bg-green-500/10',
            iconBg: 'bg-green-500/10',
            iconColor: 'text-green-600',
            desc: 'Tablets handed out this morning',
          },
          {
            label: 'Collected Today',
            value: dashboardStats.collectedToday,
            icon: <ArrowDownCircle className="w-6 h-6 text-blue-600" />,
            bg: 'bg-blue-500/10',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-600',
            desc: 'Tablets returned this afternoon',
          },
          {
            label: 'Pending Collections',
            value: dashboardStats.pendingCollections,
            icon: <UserX className="w-6 h-6 text-yellow-600" />,
            bg: 'bg-yellow-500/10',
            iconBg: 'bg-yellow-500/10',
            iconColor: 'text-yellow-600',
            desc: 'Tablets not yet returned',
          },
        ].map((stat, idx) => (
          <div
            key={stat.label}
            className={`bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl animate-in fade-in-10 duration-400`}
            style={{ animationDelay: `${idx * 60}ms` }}
          >
          <div className="flex items-center justify-between mb-3">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center scale-100 hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
        </div>
            </div>
            <div className="text-xs text-muted-foreground">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="space-y-4 animate-in fade-in-10 duration-400">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group scale-100 hover:scale-105 animate-in fade-in-10 duration-400">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUpCircle className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs">Start Distribution</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-card border-border/50 shadow-md hover:shadow-lg transition-all duration-300 group scale-100 hover:scale-105 animate-in fade-in-10 duration-400">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowDownCircle className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-xs">Start Collection</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-card border-border/50 shadow-md hover:shadow-lg transition-all duration-300 group scale-100 hover:scale-105 animate-in fade-in-10 duration-400">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-xs">Send Reminders</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-card border-border/50 shadow-md hover:shadow-lg transition-all duration-300 group scale-100 hover:scale-105 animate-in fade-in-10 duration-400">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-xs">Print Reports</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-card border-border/50 shadow-md hover:shadow-lg transition-all duration-300 group scale-100 hover:scale-105 animate-in fade-in-10 duration-400">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-xs">System Settings</span>
          </Button>
        </div>
      </div>

      {/* Distribution/Collection Overview */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-xl animate-in fade-in-10 duration-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Distribution & Collection Overview</h2>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
        </div>
        {/* Progress Bars */}
        <div className="space-y-6">
          {/* Distributed */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <ArrowUpCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-700">Distributed</span>
                <span className="text-lg font-bold text-green-700">{complianceData.distributed}</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(complianceData.distributed / complianceData.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
          {/* Collected */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <ArrowDownCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-blue-700">Collected</span>
                <span className="text-lg font-bold text-blue-700">{complianceData.collected}</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(complianceData.collected / complianceData.total) * 100}%` }}
                />
          </div>
            </div>
          </div>
          {/* Pending */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-yellow-700">Pending</span>
                <span className="text-lg font-bold text-yellow-700">{complianceData.pending}</span>
        </div>
              <div className="w-full bg-yellow-100 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(complianceData.pending / complianceData.total) * 100}%` }}
                />
              </div>
          </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-xl animate-in fade-in-10 duration-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { time: '2 min ago', action: 'Tablet collected from John Doe (Class 3A)', status: 'success', icon: ArrowDownCircle },
            { time: '5 min ago', action: 'Tablet distributed to Sarah Smith (Class 2B)', status: 'success', icon: ArrowUpCircle },
            { time: '12 min ago', action: 'Reminder sent to 4 students with pending tablets', status: 'info', icon: Bell },
            { time: '1 hour ago', action: 'Morning distribution session started', status: 'success', icon: ArrowUpCircle },
          ].map((activity, index) => {
            const IconComponent = activity.icon
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors animate-in fade-in-10 duration-400" style={{ animationDelay: `${index * 60}ms` }}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-green-500/10 text-green-600' :
                  activity.status === 'warning' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-blue-500/10 text-blue-600'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
                <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
