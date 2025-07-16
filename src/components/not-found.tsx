import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Watermark */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none select-none">
        <div className="text-[10rem] font-extrabold text-primary rotate-12">GSTS</div>
      </div>
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="text-7xl font-extrabold text-primary drop-shadow-lg">404</div>
        <div className="text-2xl font-bold text-foreground">Page Not Found</div>
        <div className="text-muted-foreground text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </div>
        <Link to="/">
          <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg shadow">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound