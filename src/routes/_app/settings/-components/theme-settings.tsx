import { Button } from '@/components/ui/button'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeSettings() {
  const { setTheme, theme } = useTheme()
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Theme</h2>
      <div className="flex space-x-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          onClick={() => setTheme('light')}
          className="flex items-center space-x-2"
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          onClick={() => setTheme('dark')}
          className="flex items-center space-x-2"
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
        </Button>
        <Button
          variant={theme === 'system' ? 'default' : 'outline'}
          onClick={() => setTheme('system')}
          className="flex items-center space-x-2"
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
        </Button>
      </div>
    </div>
  )
} 