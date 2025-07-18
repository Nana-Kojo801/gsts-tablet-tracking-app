import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Submissions } from '@/types'
import type { DialogState } from './-components/types'
import SubmissionDialog from './-components/submission-dialog'
import SubmissionsTable from './-components/submissions-table'
import DashboardStats from './-components/dashboard-stats'

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
    action: 'add' | 'delete',
    submissionObj: Submissions | null = null,
  ) => {
    setDialogState({ open: true, action, submissionObj })
  }
  const closeDialog = () => {
    setDialogState({ open: false, action: null, submissionObj: null })
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Tablet Submissions
          </h1>
          <p className="text-muted-foreground">
            Manage and record tablet collections and submissions for students and classes
          </p>
        </div>
      </div>

      {/* Dashboard Summary */}
      <DashboardStats />

      {/* Submissions Table */}
      <div className="overflow-x-auto">
        <SubmissionsTable 
          onAdd={() => openDialog('add')}
          onDelete={(item) => openDialog('delete', item)}
        />
      </div>

      {/* Submission Dialog */}
      <SubmissionDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  )
}
