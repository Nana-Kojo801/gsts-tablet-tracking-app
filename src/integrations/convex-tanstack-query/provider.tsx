import { ConvexQueryClient } from '@convex-dev/react-query'
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { toast } from 'sonner'
import { CheckCircle, XCircle } from 'lucide-react'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

// Custom Success Toast Component
const SuccessToast = ({ message }: { message: string }) => (
  <div className="flex items-center gap-3 p-4 bg-green-100 dark:bg-green-900/80 border border-green-300 dark:border-green-700 rounded-lg shadow-lg">
    <CheckCircle className="w-5 h-5 text-green-700 dark:text-green-300 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-medium text-green-900 dark:text-green-100">{message}</p>
    </div>
  </div>
)

// Custom Error Toast Component
const ErrorToast = ({ message }: { message: string }) => (
  <div className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900/80 border border-red-300 dark:border-red-700 rounded-lg shadow-lg">
    <XCircle className="w-5 h-5 text-red-700 dark:text-red-300 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-medium text-red-900 dark:text-red-100">{message}</p>
    </div>
  </div>
)

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
      toast.custom(() => <SuccessToast message={successMessage} />)
    },
    onError(_error, _variables, _context, mutation) {
      const meta = mutation.options.meta as { errorMessage?: string } | undefined
      const errorMessage = meta?.errorMessage || 'Operation failed'
      toast.custom(() => <ErrorToast message={errorMessage} />)
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
