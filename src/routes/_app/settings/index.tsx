import { createFileRoute } from '@tanstack/react-router'
import { ThemeSettings } from './-components/theme-settings'
import { AccountSettings } from './-components/account-settings'
import { DataManagementSettings } from './-components/data-management-settings'

export const Route = createFileRoute('/_app/settings/')({
  component: SettingsInterface,
})

function SettingsInterface() {

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and user settings
          </p>
        </div>
      </div>

      <ThemeSettings />

      <AccountSettings />
      <DataManagementSettings />
    </div>
  )
}
