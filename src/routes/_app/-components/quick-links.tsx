import { Button } from '@/components/ui/button'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  Settings,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function QuickLinks() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Quick Links
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/submissions" className="contents">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-primary hover:text-primary-foreground border-border/50 shadow-md transition-all duration-300 group scale-100 animate-in fade-in-10 duration-400"
          >
            <ArrowDownCircle className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
            <span className="font-semibold text-xs">Submission</span>
          </Button>
        </Link>
        <Link to="/distributions" className="contents">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-primary hover:text-primary-foreground border-border/50 shadow-md transition-all duration-300 group scale-100 animate-in fade-in-10 duration-400"
          >
            <ArrowUpCircle className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
            <span className="font-semibold text-xs">Distribution</span>
          </Button>
        </Link>
        <Link to="/reports" className="contents">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-primary hover:text-primary-foreground border-border/50 shadow-md transition-all duration-300 group scale-100 animate-in fade-in-10 duration-400"
          >
            <BarChart3 className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
            <span className="font-semibold text-xs">Reports & Analytics</span>
          </Button>
        </Link>
        <Link to="/settings" className="contents">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-primary hover:text-primary-foreground border-border/50 shadow-md transition-all duration-300 group scale-100 animate-in fade-in-10 duration-400"
          >
            <Settings className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
            <span className="font-semibold text-xs">Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
