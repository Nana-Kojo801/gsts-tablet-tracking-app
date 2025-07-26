import { CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export const SuccessToast = ({ message }: { message: string }) => (
  <div className="flex items-center gap-3 p-4 bg-green-100 dark:bg-green-900/80 border border-green-300 dark:border-green-700 rounded-lg shadow-lg">
    <CheckCircle className="w-5 h-5 text-green-700 dark:text-green-300 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-medium text-green-900 dark:text-green-100">
        {message}
      </p>
    </div>
  </div>
)

// Custom Error Toast Component
export const ErrorToast = ({ message }: { message: string }) => (
  <div className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900/80 border border-red-300 dark:border-red-700 rounded-lg shadow-lg">
    <XCircle className="w-5 h-5 text-red-700 dark:text-red-300 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-medium text-red-900 dark:text-red-100">
        {message}
      </p>
    </div>
  </div>
)

export const customToast = (message: string, type: 'success' | 'error') => {
  if (type === 'success') {
    toast.custom(() => <SuccessToast message={message} />)
  } else if (type === 'error') {
    toast.custom(() => <ErrorToast message={message} />)
  }
}
