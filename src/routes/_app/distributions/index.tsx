import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { DialogState } from './-components/types'
import DistributionDialog from './-components/distribution-dialog'
import DistributionsTable from './-components/distributions-table'
import DashboardStats from './-components/dashboard-stats'

export const Route = createFileRoute('/_app/distributions/')({
  component: DistributionsPage,
})

function DistributionsPage() {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    distributionObj: null,
  })

  // Helper functions
  const openDialog = (
    action: 'add' | 'delete',
    distributionObj: any = null,
  ) => {
    setDialogState({ open: true, action, distributionObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, distributionObj: null })
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Tablet Distributions
          </h1>
          <p className="text-muted-foreground">
            Manage and record tablet distributions to students and classes
          </p>
        </div>
      </div>

      {/* Dashboard Summary */}
      <DashboardStats />

      {/* Distributions Table */}
      <div className="overflow-x-auto">
        <DistributionsTable 
          onAdd={() => openDialog('add')}
          onDelete={(item) => openDialog('delete', item)}
        />
      </div>

      {/* Distribution Dialog */}
      <DistributionDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}
