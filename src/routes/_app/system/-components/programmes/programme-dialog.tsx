import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { Programme } from '@/types'
import type { DialogState } from './types'
import ProgrammeForm from './programme-form'
import { useDeleteProgrammeMutation } from '@/mutations'
import { Button } from '@/components/ui/button'

type ProgrammeDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const ProgrammeDialog = ({
  dialogState,
  closeDialog,
}: ProgrammeDialogProps) => {
  const [programmeData, setProgrammeData] = useState<Programme | null>(
    dialogState.programmeObj,
  )
  const { action, open, programmeObj } = dialogState

  const deleteProgramme = useDeleteProgrammeMutation()

  useEffect(() => {
    if (action === 'add') {
      setProgrammeData(null)
    } else if ((action === 'edit' || 'delete') && programmeObj) {
      setProgrammeData(programmeObj)
    }
  }, [action, programmeObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Add new programme'}
            {action === 'edit' && `Edit programme`}
            {action === 'delete' && `Delete programme`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && (
            <ProgrammeForm
              type="add"
              programmeObj={null}
              closeDialog={closeDialog}
            />
          )}
          {action === 'edit' && programmeData && (
            <ProgrammeForm
              type="edit"
              programmeObj={programmeData}
              closeDialog={closeDialog}
            />
          )}
          {action === 'delete' && programmeData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete the programme{' '}
                <span className="font-semibold">{programmeData.name}</span>?
                This action cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={deleteProgramme.isPending}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteProgramme.mutateAsync({ id: programmeData._id })
                    closeDialog()
                  }}
                >
                  {deleteProgramme.isPending ? 'Deleting...' : 'Delete Programme'}
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

export default ProgrammeDialog
