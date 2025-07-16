import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'
import type { ConvexReactClient } from 'convex/react'
import { api } from '@convex/_generated/api'
import type { User } from '@/types'

interface MyRouterContext {
  queryClient: QueryClient
  convex: ConvexReactClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context: { convex }}) => {
    const userId = localStorage.getItem('session-userId') as User['_id']
    if(!userId) return { user: null }
    const user = await convex.query(api.users.get, { id: userId })
    return { user }
  },
  component: () => (
    <div className='w-screen h-dvh relative overflow-y-auto'>
      <Outlet />
      <Toaster />
    </div>
  ),
})
