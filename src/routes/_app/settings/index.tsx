import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Monitor,
  Palette,
  Clock,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Smartphone,
  Tablet,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Copy,
  ExternalLink,
  HelpCircle,
  Info,
  MapPin
} from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription, DialogTrigger } from '@/components/ui/dialog'

export const Route = createFileRoute('/_app/settings/')({
  component: SettingsInterface,
})

function SettingsInterface() {
  const { setTheme, theme } = useTheme()
  const [settings, setSettings] = useState({
    defaultCollectionTime: '15:30',
    defaultDistributionTime: '07:30',
    theme: 'system',
    compactMode: false,
    showAvatars: true,
    showStatusIndicators: true,
    showNotifications: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
    requirePasswordChange: false,
    passwordExpiryDays: 90,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    deviceTracking: true,
    locationServices: true,
    exportFormat: 'pdf',
    includeSensitiveData: false,
    autoExport: false,
    exportFrequency: 'weekly',
    dataRetention: 365,
    name: 'Admin User',
    autoBackup: false,
    backupFrequency: 'weekly',
  })
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editAccount, setEditAccount] = useState({
    name: settings.name,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSaveSettings = () => {
    // Mock save functionality
    console.log('Saving settings:', settings)
  }

  const handleResetSettings = () => {
    // Mock reset functionality
    console.log('Resetting settings to defaults')
  }

  const handleEditAccountSave = () => {
    setSettings(s => ({ ...s, name: editAccount.name }))
    setEditDialogOpen(false)
    // Handle password change logic here
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and user settings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleResetSettings} className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Reset to Defaults</span>
          </Button>
          <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      {/* General Settings Section */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">General Settings</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium">Default Distribution Time</Label>
              <Input
                type="time"
                value={settings.defaultDistributionTime}
                onChange={(e) => setSettings({...settings, defaultDistributionTime: e.target.value})}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Default Collection Time</Label>
              <Input
                type="time"
                value={settings.defaultCollectionTime}
                onChange={(e) => setSettings({...settings, defaultCollectionTime: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-sm font-medium">Theme</Label>
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
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Account</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Username</div>
            <div className="text-lg font-semibold text-foreground">{settings.name}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Password</div>
            <div className="text-lg font-semibold text-foreground tracking-widest">••••••••</div>
          </div>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2 md:mt-0">Edit Account</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Account</DialogTitle>
                <DialogDescription>Update your username and password below.</DialogDescription>
              </DialogHeader>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleEditAccountSave();
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="edit-username">Username</Label>
                  <Input
                    id="edit-username"
                    value={editAccount.name}
                    onChange={e => setEditAccount(a => ({ ...a, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-current-password">Current Password</Label>
                  <Input
                    id="edit-current-password"
                    type="password"
                    value={editAccount.currentPassword}
                    onChange={e => setEditAccount(a => ({ ...a, currentPassword: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-new-password">New Password</Label>
                  <Input
                    id="edit-new-password"
                    type="password"
                    value={editAccount.newPassword}
                    onChange={e => setEditAccount(a => ({ ...a, newPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-confirm-password">Confirm New Password</Label>
                  <Input
                    id="edit-confirm-password"
                    type="password"
                    value={editAccount.confirmPassword}
                    onChange={e => setEditAccount(a => ({ ...a, confirmPassword: e.target.value }))}
                  />
                </div>
                <DialogFooter className='grid grid-cols-2'>
                  <Button type="submit" className="w-full">Save</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost" className="w-full">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Data Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Backup & Export</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="text-sm font-medium">Auto Backup</span>
                    <p className="text-xs text-muted-foreground">Automatically backup data</p>
                  </div>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                />
              </div>
              {settings.autoBackup && (
                <div>
                  <Label className="text-sm font-medium">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Export Format</Label>
                <Select value={settings.exportFormat} onValueChange={(value) => setSettings({...settings, exportFormat: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <span className="text-sm font-medium">Include Sensitive Data</span>
                    <p className="text-xs text-muted-foreground">Export personal information</p>
                  </div>
                </div>
                <Switch
                  checked={settings.includeSensitiveData}
                  onCheckedChange={(checked) => setSettings({...settings, includeSensitiveData: checked})}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import Data</span>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Data Retention</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Data Retention Period (days)</Label>
                <Select value={settings.dataRetention.toString()} onValueChange={(value) => setSettings({...settings, dataRetention: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Data Cleanup</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Old data will be automatically deleted after {settings.dataRetention} days
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full flex items-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Data</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset to Defaults</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
