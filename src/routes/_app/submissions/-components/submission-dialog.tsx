import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { Submissions } from '@/types'
import type { DialogState } from './types'
import SubmissionForm from './submission-form'
import { useDeleteSubmissionMutation } from '@/mutations'
import { Button } from '@/components/ui/button'

type SubmissionDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const SubmissionDialog = ({
  dialogState,
  closeDialog,
}: SubmissionDialogProps) => {
  const [submissionData, setSubmissionData] = useState<Submissions | null>(
    dialogState.submissionObj,
  )
  const { action, open, submissionObj } = dialogState

  const deleteSubmission = useDeleteSubmissionMutation()

  useEffect(() => {
    if (action === 'add') {
      setSubmissionData(null)
    } else if (action === 'delete' && submissionObj) {
      setSubmissionData(submissionObj)
    }
  }, [action, submissionObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Record New Submission'}
            {action === 'delete' && `Delete Submission`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && (
            <SubmissionForm closeDialog={closeDialog} />
          )}
          {action === 'delete' && submissionData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete this submission{' '}. This
                action cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={deleteSubmission.isPending}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteSubmission.mutateAsync({ id: submissionData._id })
                    closeDialog()
                  }}
                >
                  {deleteSubmission.isPending ? 'Deleting...' : 'Delete Submission'}
                </Button>
                <Button
                  onClick={closeDialog}
                  variant="outline"
                  className="h-10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubmissionDialog
