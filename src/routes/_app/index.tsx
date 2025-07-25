import { createFileRoute } from '@tanstack/react-router'
import { DashboardStats } from './-components/dashboard-stats'
import { QuickLinks } from './-components/quick-links'
import RecentSubmissions from './-components/recent-submissions'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})

function Dashboard() {

  return (
    <div className="w-full min-h-screen overflow-x-hidden space-y-6 sm:space-y-8 p-2 sm:p-6 animate-in fade-in-20 slide-in-from-bottom-8 duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Tablet Management Dashboard
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Welcome! Here’s a summary of your tablet tracking system.
          </p>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <DashboardStats />

      {/* Quick Links */}
      <QuickLinks />

      {/* Recent Activity Section */}
      <RecentSubmissions />
    </div>
  )
}
