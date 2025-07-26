import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AppSidebar from '@/components/app-sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import NotFound from '@/components/not-found'
import ErrorPage from '@/components/error-page'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useEffect } from 'react'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/login' })
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(convexQuery(api.data.getAllData, {}))
  },
})

function AppLayout() {
  const isMobile = useIsMobile()

  useEffect(() => {
    document.body.classList.add('app-loaded')
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      {/* Sidebar (fixed) */}
      <AppSidebar />

      {/* Main Content */}
      <div
        className={
          isMobile ? 'flex flex-col' : 'flex flex-col' + ' pl-65' // padding left for sidebar width
        }
      >
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gradient-to-br from-background via-background to-muted/10 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
