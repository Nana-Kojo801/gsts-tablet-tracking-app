import { Route } from '@/routes/__root'
import type { User } from '@/types'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

export function useUser() {
  const { user } = Route.useRouteContext()
  if (!user) throw redirect({ to: '/login' })
  const { data: liveUser } = useSuspenseQuery({
    ...convexQuery(api.users.get, { id: user._id }),
    initialData: user
  })
  return liveUser as unknown as User
}
