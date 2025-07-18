import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { DialogState } from './types'
import DistributionForm from './distribution-form'
import { Button } from '@/components/ui/button'
import { useDeleteDistributionMutation } from '@/mutations'

const DistributionDialog = ({
  dialogState,
  closeDialog,
}: {
  dialogState: DialogState
  closeDialog: () => void
}) => {
  const [distributionData, setDistributionData] = useState<any | null>(
    dialogState.distributionObj,
  )
  const { action, open, distributionObj } = dialogState

  const deleteDistribution = useDeleteDistributionMutation()

  useEffect(() => {
    if (action === 'add') {
      setDistributionData(null)
    } else if (action === 'delete' && distributionObj) {
      setDistributionData(distributionObj)
    }
  }, [action, distributionObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Record New Distribution'}
            {action === 'delete' && 'Delete Distribution'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && <DistributionForm closeDialog={closeDialog} />}
          {action === 'delete' && distributionData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete this submission . This action
                cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={deleteDistribution.isPending}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteDistribution.mutateAsync({
                      id: distributionData._id,
                    })
                    closeDialog()
                  }}
                >
                  {deleteDistribution.isPending
                    ? 'Deleting...'
                    : 'Delete Submission'}
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

export default DistributionDialog
