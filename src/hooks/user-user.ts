import { Route } from "@/routes/__root";


export function useUser() {
    const { user } = Route.useRouteContext()
    return user!
}