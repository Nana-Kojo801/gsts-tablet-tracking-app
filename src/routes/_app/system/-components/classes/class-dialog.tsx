import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import {
  useCreateClassMutation,
  useDeleteClassMutation,
  useEditClassMutation,
} from '../-mutations'
import type { Class } from '@/types'
import type { DialogState } from './types'

type ClassDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const ClassDialog = ({ dialogState, closeDialog }: ClassDialogProps) => {
  const [newClassName, setNewClassName] = useState('')
  const [classData, setClassData] = useState<Class | null>(dialogState.classObj)
  const { action, open, classObj } = dialogState

  const { mutateAsync: addClass, isPending: isAddingClass } =
    useCreateClassMutation()
  const { mutateAsync: editClass, isPending: isEditingClass } =
    useEditClassMutation()
  const { mutateAsync: deleteClass, isPending: isDeletingClass } =
    useDeleteClassMutation()

  useEffect(() => {
    if (action === 'add') {
      setNewClassName('')
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
            <Input
              placeholder="Class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              autoFocus
            />
          )}
          {action === 'edit' && classData && (
            <Input
              placeholder="Class name"
              value={classData.name}
              onChange={(e) =>
                setClassData({ ...classData, name: e.target.value })
              }
              autoFocus
            />
          )}
          {action === 'delete' && classData && (
            <div className="text-red-600">
              Are you sure you want to delete the class{' '}
              <span className="font-semibold">{classData.name}</span>? This
              action cannot be undone.
            </div>
          )}
        </div>
        <DialogFooter>
          {action === 'add' && (
            <Button
              onClick={async () => {
                await addClass({ name: newClassName })
                closeDialog()
                setNewClassName('')
              }}
              disabled={!newClassName.trim() || isAddingClass}
            >
              {isAddingClass ? 'Adding...' : 'Add'}
            </Button>
          )}
          {action === 'edit' && classData && (
            <Button
              onClick={async () => {
                await editClass({
                  id: classData._id,
                  name: classData.name.trim(),
                })
                closeDialog()
                setNewClassName('')
              }}
              disabled={!classData.name.trim() || isEditingClass}
            >
              {isEditingClass ? 'Editing...' : 'Edit'}
            </Button>
          )}
          {action === 'delete' && classData && (
            <Button
              onClick={async () => {
                await deleteClass({ id: classData._id})
                closeDialog()
              }}
              variant="destructive"
              disabled={isDeletingClass}
            >
              {isDeletingClass ? 'Deleting...' : 'Delete'}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ClassDialog
