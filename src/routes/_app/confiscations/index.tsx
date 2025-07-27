import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Ban,
  Search,
  RotateCcw,
  CheckCircle,
  Tablet,
} from 'lucide-react'

export const Route = createFileRoute('/_app/confiscations/')({
  component: ConfiscationsPage,
})

// Mock data for confiscated devices
const mockConfiscations = [
  {
    id: '1',
    studentName: 'Kwame Asante',
    indexNumber: 'SHS/2024/001',
    className: 'Form 3A',
    programme: 'General Science',
    tabletImei: 'IME123456789012345',
    reason: 'Using device during class hours without permission',
    confiscatedAt: '2024-07-26T10:30:00Z',
    confiscatedBy: 'Mr. Emmanuel Boateng',
    status: 'confiscated',
    expectedReturnDate: '2024-07-30T00:00:00Z',
  },
  {
    id: '2',
    studentName: 'Ama Osei',
    indexNumber: 'SHS/2024/045',
    className: 'Form 2B',
    programme: 'Business',
    tabletImei: 'IME987654321098765',
    reason: 'Accessing inappropriate content during study period',
    confiscatedAt: '2024-07-25T14:15:00Z',
    confiscatedBy: 'Mrs. Grace Mensah',
    status: 'confiscated',
    expectedReturnDate: '2024-07-29T00:00:00Z',
  },
  {
    id: '3',
    studentName: 'Kofi Adjei',
    indexNumber: 'SHS/2024/078',
    className: 'Form 1C',
    programme: 'General Arts',
    tabletImei: 'IME456789012345678',
    reason: 'Disrupting class with device notifications',
    confiscatedAt: '2024-07-24T09:45:00Z',
    confiscatedBy: 'Mr. Samuel Owusu',
    status: 'returned',
    expectedReturnDate: '2024-07-27T00:00:00Z',
    returnedAt: '2024-07-27T08:30:00Z',
  },
  {
    id: '4',
    studentName: 'Akosua Frimpong',
    indexNumber: 'SHS/2024/112',
    className: 'Form 3B',
    programme: 'Visual Arts',
    tabletImei: 'IME234567890123456',
    reason: 'Downloading unauthorized applications',
    confiscatedAt: '2024-07-23T11:20:00Z',
    confiscatedBy: 'Mrs. Abena Koranteng',
    status: 'confiscated',
    expectedReturnDate: '2024-07-28T00:00:00Z',
  },
  {
    id: '5',
    studentName: 'Yaw Mensah',
    indexNumber: 'SHS/2024/089',
    className: 'Form 2A',
    programme: 'General Science',
    tabletImei: 'IME345678901234567',
    reason: 'Using device for gaming during lessons',
    confiscatedAt: '2024-07-22T15:10:00Z',
    confiscatedBy: 'Mr. Kwame Asare',
    status: 'returned',
    expectedReturnDate: '2024-07-25T00:00:00Z',
    returnedAt: '2024-07-25T07:45:00Z',
  },
]

// Dashboard Stats Component
function DashboardStats() {
  const confiscatedCount = mockConfiscations.filter(
    (c) => c.status === 'confiscated',
  ).length
  const returnedCount = mockConfiscations.filter(
    (c) => c.status === 'returned',
  ).length
  const totalRecords = mockConfiscations.length

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
    }
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

function ConfiscationsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleReturnDevice = (confiscationId: string) => {
    console.log('Return device:', confiscationId)
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Device Confiscations
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage confiscated tablets and return status
          </p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Search and Filters */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-3 items-center">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, imei, index no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <Button className="flex items-center space-x-2" onClick={() => {}}>
              <Ban className="w-4 h-4" />
              <span>Confiscate</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Confiscations List */}
      <div className="space-y-3">
        {mockConfiscations.map((confiscation, idx) => (
          <div
            key={confiscation.id}
            className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm hover:shadow transition-all duration-200 animate-in fade-in-10 slide-in-from-bottom-4"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex flex-col gap-2">
              {/* Top row - compact header */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {confiscation.studentName}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {confiscation.indexNumber}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {confiscation.className}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      {confiscation.programme}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={`px-2 py-0.5 text-xs rounded-md ${
                      confiscation.status === 'confiscated'
                        ? 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400'
                        : 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400'
                    }`}
                  >
                    {confiscation.status === 'confiscated'
                      ? 'Confiscated'
                      : 'Returned'}
                  </Badge>

                  {confiscation.status === 'confiscated' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReturnDevice(confiscation.id)}
                      className="text-green-600 dark:text-green-400 border-green-300 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30 px-3 py-1.5"
                    >
                      <RotateCcw className="h-3 w-3 mr-1.5" />
                      Return
                    </Button>
                  )}
                </div>
              </div>

              {/* Middle section - device info */}
              <div className="mt-2 flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">IMEI:</span>
                  <span className="ml-1 font-mono">
                    {confiscation.tabletImei}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-1">
                    {new Date(confiscation.confiscatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">By:</span>
                  <span className="ml-1">{confiscation.confiscatedBy}</span>
                </div>
              </div>

              {/* Bottom section - reason */}
              <div className="mt-2 pt-2 border-t border-border/20">
                <p className="text-sm">
                  <span className="text-muted-foreground">Reason:</span>
                  <span className="ml-1.5">{confiscation.reason}</span>
                </p>
              </div>
            </div>
          </div>
        ))}

        {mockConfiscations.length === 0 && (
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center mx-auto mb-3">
              <Ban className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1.5">
              No confiscations found
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}
