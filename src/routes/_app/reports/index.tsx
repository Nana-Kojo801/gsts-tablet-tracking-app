import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Tablet,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  RefreshCw,
  Search,
  CalendarDays,
  Target,
  Award,
  Activity,
  Settings,
  Printer,
  Share2,
  MoreHorizontal
} from 'lucide-react'

export const Route = createFileRoute('/_app/reports/')({
  component: ReportsInterface,
})

function ReportsInterface() {
  const [selectedReport, setSelectedReport] = useState('overview')
  const [dateRange, setDateRange] = useState('this_week')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedTeacher, setSelectedTeacher] = useState('all')

  // Mock data for demonstration
  const reportData = {
    overview: {
      totalStudents: 45,
      totalTablets: 45,
      distributedToday: 42,
      collectedToday: 38,
      pendingCollection: 4,
      missingDevices: 0,
      avgCollectionTime: '15:32',
      conditionExcellent: 35,
      conditionGood: 8,
      conditionFair: 2,
      conditionPoor: 0
    },
    distribution: {
      daily: [
        { date: '2024-01-15', distributed: 42, collected: 38, pending: 4 },
        { date: '2024-01-14', distributed: 45, collected: 45, pending: 0 },
        { date: '2024-01-13', distributed: 43, collected: 41, pending: 2 },
        { date: '2024-01-12', distributed: 44, collected: 44, pending: 0 },
        { date: '2024-01-11', distributed: 42, collected: 40, pending: 2 },
        { date: '2024-01-10', distributed: 45, collected: 45, pending: 0 },
        { date: '2024-01-09', distributed: 41, collected: 39, pending: 2 }
      ],
      byClass: [
        { class: '3A', students: 15, avgTime: '15:15' },
        { class: '2B', students: 18, avgTime: '15:45' },
        { class: '1A', students: 12, avgTime: '16:10' }
      ]
    },
    condition: {
      overall: {
        excellent: 35,
        good: 8,
        fair: 2,
        poor: 0
      },
      byComponent: {
        screen: { excellent: 40, good: 4, fair: 1, poor: 0 },
        battery: { excellent: 32, good: 10, fair: 3, poor: 0 },
        physical: { excellent: 38, good: 6, fair: 1, poor: 0 },
        functionality: { excellent: 35, good: 8, fair: 2, poor: 0 }
      }
    }
  }

  const getComplianceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600'
    if (rate >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Activity className="w-4 h-4 text-blue-600" />
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into tablet distribution and collection performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Report Filters</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-sm font-medium">Report Type</Label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview Dashboard</SelectItem>
                <SelectItem value="distribution">Distribution Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="3A">Class 3A</SelectItem>
                <SelectItem value="2B">Class 2B</SelectItem>
                <SelectItem value="1A">Class 1A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Teacher</Label>
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="teacher1">Mr. Johnson</SelectItem>
                <SelectItem value="teacher2">Ms. Williams</SelectItem>
                <SelectItem value="teacher3">Mr. Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{reportData.overview.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                {getTrendIcon(reportData.overview.totalStudents, 43)}
                <span className="ml-2 text-muted-foreground">+2 from last week</span>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Collection Time</p>
                  <p className="text-3xl font-bold text-foreground">{reportData.overview.avgCollectionTime}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                {getTrendIcon(15, 16)}
                <span className="ml-2 text-muted-foreground">-1 min faster</span>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Collection</p>
                  <p className="text-3xl font-bold text-foreground">{reportData.overview.pendingCollection}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                {getTrendIcon(reportData.overview.pendingCollection, 2)}
                <span className="ml-2 text-muted-foreground">+2 pending</span>
              </div>
            </div>
          </div>

          {/* Daily Activity Chart - now full width */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Daily Activity</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="space-y-4">
              {reportData.distribution.daily.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CalendarDays className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600 font-medium">{day.distributed} distributed</span>
                    <span className="text-blue-600 font-medium">{day.collected} collected</span>
                    {day.pending > 0 && (
                      <span className="text-orange-600 font-medium">{day.pending} pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance by Class */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Performance by Class</h3>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Compare
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reportData.distribution.byClass.map((classData, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">Class {classData.class}</h4>
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">{classData.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Time:</span>
                      <span className="font-medium">{classData.avgTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'distribution' && (
        <div className="space-y-6">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Distribution & Collection Timeline</h3>
            <div className="space-y-4">
              {reportData.distribution.daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {new Date(day.date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{day.distributed}</div>
                        <div className="text-xs text-muted-foreground">Distributed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-blue-600">{day.collected}</div>
                        <div className="text-xs text-muted-foreground">Collected</div>
                      </div>
                      {day.pending > 0 && (
                        <div className="text-center">
                          <div className="text-sm font-medium text-orange-600">{day.pending}</div>
                          <div className="text-xs text-muted-foreground">Pending</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {((day.collected / day.distributed) * 100).toFixed(1)}% compliance
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {day.pending > 0 ? `${day.pending} outstanding` : 'All collected'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Remove compliance report conditional render and any compliance-related UI */}

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
