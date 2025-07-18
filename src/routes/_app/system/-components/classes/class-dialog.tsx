import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { Class } from '@/types'
import type { DialogState } from './types'
import ClassForm from './class-form'
import { useDeleteClassMutation } from '@/mutations'
import { Button } from '@/components/ui/button'

type ClassDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const ClassDialog = ({
  dialogState,
  closeDialog,
}: ClassDialogProps) => {
  const [classData, setClassData] = useState<Class | null>(
    dialogState.classObj,
  )
  const { action, open, classObj } = dialogState

  const deleteClass = useDeleteClassMutation()

  useEffect(() => {
    if (action === 'add') {
      setClassData(null)
    } else if ((action === 'edit' || 'delete') && classObj) {
      setClassData(classObj)
    }
  }, [action, classObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Add new class'}
            {action === 'edit' && `Edit class`}
            {action === 'delete' && `Delete class`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && (
            <ClassForm
              type="add"
              classObj={null}
              closeDialog={closeDialog}
            />
          )}
          {action === 'edit' && classData && (
            <ClassForm
              type="edit"
              classObj={classData}
              closeDialog={closeDialog}
            />
          )}
          {action === 'delete' && classData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete the class{' '}
                <span className="font-semibold">{classData.name}</span>?
                This action cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={deleteClass.isPending}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteClass.mutateAsync({ id: classData._id })
                    closeDialog()
                  }}
                >
                  {deleteClass.isPending ? 'Deleting...' : 'Delete Class'}
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

export default ClassDialog
