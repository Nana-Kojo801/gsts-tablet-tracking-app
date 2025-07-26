import { customToast } from '@/components/custom-toast'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

const convexQueryClient = new ConvexQueryClient(convex)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
  mutationCache: new MutationCache({
    onSuccess(_data, _variables, _context, mutation) {
      const meta = mutation.options.meta as { successMessage?: string } | undefined
      const successMessage = meta?.successMessage || 'Operation completed successfully'
      customToast(successMessage, 'success')
    },
    onError(_error, _variables, _context, mutation) {
      const meta = mutation.options.meta as { errorMessage?: string } | undefined
      console.log('error', _error)
      const errorMessage = meta?.errorMessage || 'Operation failed'
      customToast(errorMessage, 'error')
    },
  })
})
convexQueryClient.connect(queryClient)

export const getContext = () => ({
  queryClient,
  convex
})

export function ConvexTanstackQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConvexProvider>
  )
}
