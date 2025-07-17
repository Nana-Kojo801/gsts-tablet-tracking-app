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

type SubmissionDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const SubmissionDialog = ({ dialogState, closeDialog }: SubmissionDialogProps) => {
  const [submissionData, setSubmissionData] = useState<Submissions | null>(
    dialogState.submissionObj,
  )
  const { action, open, submissionObj } = dialogState

  useEffect(() => {
    if (action === 'add') {
      setSubmissionData(null)
    } else if ((action === 'edit' || action === 'delete') && submissionObj) {
      setSubmissionData(submissionObj)
    }
  }, [action, submissionObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Record New Submission'}
            {action === 'edit' && `Edit Submission`}
            {action === 'delete' && `Delete Submission`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && <SubmissionForm type="add" submissionObj={null} closeDialog={closeDialog} />}
          {action === 'edit' && submissionData && <SubmissionForm type="edit" submissionObj={submissionData} closeDialog={closeDialog} />}
          {action === 'delete' && submissionData && (
            <div className="text-red-600">
              Are you sure you want to delete the submission for{' '}
              <span className="font-semibold">{submissionData.student.name}</span>? This
              action cannot be undone.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubmissionDialog
