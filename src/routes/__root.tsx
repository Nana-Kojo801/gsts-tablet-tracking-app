import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'
import type { ConvexReactClient } from 'convex/react'
import { api } from '@convex/_generated/api'
import type { User } from '@/types'
import { ThemeProvider } from '@/components/theme-provider'
import { convexQuery } from '@convex-dev/react-query'
import AppLoadingScreen from '@/components/app-loading-screen'

interface MyRouterContext {
  queryClient: QueryClient
  convex: ConvexReactClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  pendingComponent: AppLoadingScreen,
  beforeLoad: async ({ context: { queryClient } }) => {
    const userId = localStorage.getItem('session-userId')
    if (!userId) return { userId: null }
    const user = await queryClient.ensureQueryData(convexQuery(api.users.get, { id: userId as User['_id'] }))
    return { user }
  },
  component: () => (
    <div className="w-full min-h-screen relative overflow-y-auto bg-background">
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
      <Toaster />
    </div>
  ),
})
