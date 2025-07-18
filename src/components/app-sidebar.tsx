import {
  LayoutDashboard,
  Users,
  Inbox,
  Gift,
  BarChart3,
  Settings,
  User,
  LogOut,
  Monitor,
  PanelLeft,
} from 'lucide-react'
import { Button } from './ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { useUser } from '@/hooks/user-user'
import Logo from '@/logo.png'
import { useIsMobile } from '@/hooks/use-mobile'
import * as React from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Students', icon: Users, href: '/students' },
  { name: 'Submissions', icon: Inbox, href: '/submissions' },
  { name: 'Distributions', icon: Gift, href: '/distributions' },
  { name: 'Reports', icon: BarChart3, href: '/reports' },
  { name: 'System', icon: Monitor, href: '/system' },
  { name: 'Settings', icon: Settings, href: '/settings' },
]

const AppSidebar = () => {
  const user = useUser()
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  // Sidebar content as a function for reuse
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <img
            src={Logo}
            className="w-10 h-10 object-cover rounded-xl shadow-lg"
          />
          <div className="flex-1">
            <div className="text-lg font-bold text-foreground">GSTS</div>
            <div className="text-xs text-muted-foreground font-medium">
              Tablet Tracker Pro
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          if (item.name === 'System' && user.role === 'user') return null
          return (
            <Link
              to={item.href}
              key={item.name}
              activeProps={{
                className: 'block',
                style: { textDecoration: 'none' },
              }}
              inactiveProps={{
                className: 'block',
                style: { textDecoration: 'none' },
              }}
              onClick={() => setOpen(false)}
            >
              {({ isActive }) => (
                <div
                  className={`w-full flex items-center h-12 px-4 rounded-lg transition-all duration-200 justify-start group
                    ${isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-muted/80 hover:text-foreground'}
                  `}
                >
                  <IconComponent
                    className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110
                      ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                    `}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {user.name}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user.role === 'admin' ? 'Admin' : 'User'}
            </div>
          </div>
          <Button onClick={() => {
            localStorage.removeItem("session-userId")
            navigate({ to: '/login' })
          }} variant="ghost" size="sm" className="h-8 w-8 p-0">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )

  if (isMobile) {
    // Hamburger menu for mobile
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-40 h-14 bg-card/90 border-b border-border/50 flex items-center px-2 shadow-xl backdrop-blur-xl">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar menu"
          >
            <PanelLeft className="w-7 h-7" />
          </Button>
          <span className="text-lg font-bold text-foreground ml-2">GSTS</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64 max-w-full">
            <div className="h-full flex flex-col">{sidebarContent}</div>
          </SheetContent>
        </Sheet>
        {/* Add top padding to main content so it's not hidden behind the bar */}
        <div className="h-14" />
      </>
    )
  }

  // Desktop sidebar (fixed, full height)
  return (
    <div
      className={`fixed left-0 top-0 bottom-0 h-screen w-65 bg-card/80 backdrop-blur-xl border-r border-border/50 transition-all duration-300 flex flex-col shadow-xl z-30`}
    >
      {sidebarContent}
    </div>
  )
}

export default AppSidebar
