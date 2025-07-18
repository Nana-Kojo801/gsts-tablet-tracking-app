import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AppSidebar from '@/components/app-sidebar'
import {
  fetchClassesQueryOptions,
  fetchProgrammesQueryOptions,
  fetchStudentsQueryOptions,
  fetchSubmissionsQueryOptions,
  fetchTabletsQueryOptions,
  fetchUsersQueryOptions,
} from '@/queries'
import AppLoadingScreen from '@/components/app-loading-screen'

export const Route = createFileRoute('/_app')({
  pendingComponent: AppLoadingScreen,
  component: AppLayout,
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/login' })
  },
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(fetchClassesQueryOptions()),
      queryClient.ensureQueryData(fetchStudentsQueryOptions()),
      queryClient.ensureQueryData(fetchProgrammesQueryOptions()),
      queryClient.ensureQueryData(fetchTabletsQueryOptions()),
      queryClient.ensureQueryData(fetchUsersQueryOptions()),
      queryClient.ensureQueryData(fetchSubmissionsQueryOptions())
    ])
  },
})

function AppLayout() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gradient-to-br from-background via-background to-muted/10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
