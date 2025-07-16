import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AppSidebar from '@/components/app-sidebar'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/login' })
  },
})

function AppLayout() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted/20 flex">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-background via-background to-muted/10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
