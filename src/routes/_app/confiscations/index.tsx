import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Ban, Search, Trash2 } from 'lucide-react'
import DashboardStats from './-components/dashboard-stats'
import ConfiscationsList from './-components/confiscations-list'
import { useAppData } from '@/hooks/use-app-data'
import CreateConfiscationDialog from './-components/create-confiscation-dialog'
import { useClearAllConfiscationsMutation } from '@/mutations'

export const Route = createFileRoute('/_app/confiscations/')({
  component: ConfiscationsPage,
})

function ConfiscationsPage() {
  const { confiscations } = useAppData()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const clearAllConfiscations = useClearAllConfiscationsMutation()

  const filteredConfiscations = useMemo(
    () =>
      confiscations.filter(
        (c) =>
          c.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.student.indexNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          c.student.tablet?.imei
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, confiscations],
  )

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Device Confiscations
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage confiscated tablets and return status
          </p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Search and Filters */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-3 items-center">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, imei, index no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            {/* Delete all button */}
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={async () => {
                await clearAllConfiscations.mutateAsync({})
              }}
            >
              <Trash2 className="size-4" />
              <span>{clearAllConfiscations.isPending ? 'Clearing...' : 'Clear All'}</span>
            </Button>
            <Button
              className="flex items-center space-x-2"
              onClick={() => {
                setShowCreateDialog(true)
              }}
            >
              <Ban className="w-4 h-4" />
              <span>Confiscate</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Confiscations List */}
      <ConfiscationsList filteredConfiscations={filteredConfiscations} />

      <CreateConfiscationDialog
        open={showCreateDialog}
        closeDialog={() => setShowCreateDialog(false)}
      />
    </div>
  )
}
