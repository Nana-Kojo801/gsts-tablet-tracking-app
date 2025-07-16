import {
  LayoutDashboard,
  Users,
  Tablet,
  BarChart3,
  Settings,
  User,
  LogOut,
  Monitor,
} from 'lucide-react'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { useUser } from '@/hooks/user-user'

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Students', icon: Users, href: '/students' },
  { name: 'Collection', icon: Tablet, href: '/collection' },
  { name: 'Reports', icon: BarChart3, href: '/reports' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'System', icon: Monitor, href: '/system' },
]

const AppSidebar = () => {
  const user = useUser()

  return (
    <div
      className={`w-65 bg-card/80 backdrop-blur-xl border-r border-border/50 transition-all duration-300 flex flex-col shadow-xl`}
    >
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-primary-foreground">G</span>
          </div>
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
          const IconComponent = item.icon;
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
          );
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
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppSidebar
