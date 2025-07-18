import { createFileRoute } from '@tanstack/react-router'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

import DashboardStats from './-components/dashboard-stats'
import RecentActivity from './-components/recent-activity'
import ChartsSection from './-components/charts-section'

export const Route = createFileRoute('/_app/reports/')({
  component: ReportsPage,
})

function ReportsPage() {
  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Visualize and analyze tablet distributions, collections, and student activity
          </p>
        </div>
      </div>

      <DashboardStats />

      <RecentActivity />

      <ChartsSection />
    </div>
  )
}
