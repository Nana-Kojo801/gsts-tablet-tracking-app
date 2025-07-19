import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

interface ErrorPageProps {
  error?: Error
  reset?: () => void
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const navigate = useNavigate()

  const handleRetry = () => {
    if (reset) {
      reset()
    } else {
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  const handleGoBack = () => {
    navigate({ to: '..' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Error Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </div>

        {/* Error Details (if available) */}
        {error && (
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <h3 className="text-sm font-medium text-foreground mb-2">Error Details:</h3>
            <p className="text-xs text-muted-foreground font-mono break-words">
              {error.message || 'Unknown error occurred'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleRetry} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button variant="outline" onClick={handleGoBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button variant="outline" onClick={handleGoHome} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-xs text-muted-foreground">
          <p>If this problem continues, please contact support</p>
          <p className="mt-1">Error ID: {Date.now().toString(36)}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage