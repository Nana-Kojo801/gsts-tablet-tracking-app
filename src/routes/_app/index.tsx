import { createFileRoute } from '@tanstack/react-router'
import { DashboardStats } from './-components/dashboard-stats'
import { QuickLinks } from './-components/quick-links'
import RecentSubmissions from './-components/recent-submissions'
import Header from './-components/header'

export const Route = createFileRoute('/_app/')({
  component: Dashboard,
})

function Dashboard() {

  return (
    <div className="w-full min-h-screen overflow-x-hidden space-y-6 sm:space-y-8 p-2 sm:p-6 animate-in fade-in-20 slide-in-from-bottom-8 duration-500">
      {/* Page Header */}
      <Header />

      {/* Key Metrics Dashboard */}
      <DashboardStats />

      {/* Quick Links */}
      <QuickLinks />

      {/* Recent Activity Section */}
      <RecentSubmissions />
    </div>
  )
}
