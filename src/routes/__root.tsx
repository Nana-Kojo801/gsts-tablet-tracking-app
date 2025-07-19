import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'
import type { ConvexReactClient } from 'convex/react'
import { api } from '@convex/_generated/api'
import type { User } from '@/types'
import { convexQuery } from '@convex-dev/react-query'
import { useTheme } from '@/components/theme-provider'
import AppLoadingScreen from '@/components/app-loading-screen'
import NotFound from '@/components/not-found'

interface MyRouterContext {
  queryClient: QueryClient
  convex: ConvexReactClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  pendingComponent: AppLoadingScreen,
  notFoundComponent: NotFound,
  beforeLoad: async ({ context: { queryClient } }) => {
    const userId = localStorage.getItem('session-userId')
    if (!userId) return { userId: null }
    const user = await queryClient.ensureQueryData(
      convexQuery(api.users.get, { id: userId as User['_id'] }),
    )
    return { user }
  },
  component: () => {
    const { theme } = useTheme()
    return (
      <div className="w-full min-h-screen relative overflow-y-auto bg-background">
        <Outlet />
        <Toaster theme={theme} />
      </div>
    )
  },
})
