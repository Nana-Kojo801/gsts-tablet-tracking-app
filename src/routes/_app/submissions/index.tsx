import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Submissions } from '@/types'
import type { DialogState } from './-components/types'
import SubmissionDialog from './-components/submission-dialog'
import SubmissionsTable from './-components/submissions-table'
import DashboardStats from './-components/dashboard-stats'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_app/submissions/')({
  component: SubmissionsPage,
})

function SubmissionsPage() {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    action: null,
    submissionObj: null,
  })

  // Helper functions
  const openDialog = (
    action: 'add' | 'edit' | 'delete',
    submissionObj: Submissions | null = null,
  ) => {
    setDialogState({ open: true, action, submissionObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, submissionObj: null })
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            Tablet Collection
          </h1>
          <p className="text-muted-foreground">
            Manage and record tablet collections and submissions for students and classes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center space-x-2" onClick={() => openDialog('add')}>
            <Plus className="w-4 h-4" />
            <span>Record Submission</span>
          </Button>
        </div>
      </div>

      {/* Dashboard Summary */}
      <DashboardStats />

      {/* Submissions Table */}
      <SubmissionsTable 
        onAdd={() => openDialog('add')}
        onEdit={(item) => openDialog('edit', item)}
        onDelete={(item) => openDialog('delete', item)}
      />

      {/* Submission Dialog */}
      <SubmissionDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}
