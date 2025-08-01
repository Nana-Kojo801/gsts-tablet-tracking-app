import { Button } from '@/components/ui/button'
import { ArrowDownCircle, BarChart3, Settings } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function QuickLinks() {
  const quickLinks = [
    {
      href: '/submissions',
      icon: (
        <ArrowDownCircle className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
      ),
      label: 'Submissions',
    },
    {
      href: '/reports',
      icon: (
        <BarChart3 className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
      ),
      label: 'Reports & Analytics',
    },
    {
      href: '/settings',
      icon: (
        <Settings className="w-6 h-6 mb-1 text-primary group-hover:text-primary-foreground transition-colors" />
      ),
      label: 'Settings',
    },
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-1">
        Quick Links
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link to={link.href} className="contents">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-card/50 hover:bg-primary hover:text-primary-foreground border-border/50 shadow-md transition-all duration-300 group scale-100 animate-in fade-in-10 duration-400"
            >
              {link.icon}
              <span className="font-semibold text-xs">{link.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
