import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { User } from '@/types'
import type { DialogState } from './types'
import UserForm from './user-form'
import { useDeleteUserMutation } from '@/mutations'
import { Button } from '@/components/ui/button'

type UserDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const UserDialog = ({ dialogState, closeDialog }: UserDialogProps) => {
  const [userData, setUserData] = useState<User | null>(dialogState.userObj)
  const { action, open, userObj } = dialogState

  const deleteUser = useDeleteUserMutation()

  useEffect(() => {
    if (action === 'add') {
      setUserData(null)
    } else if ((action === 'edit' || 'delete') && userObj) {
      setUserData(userObj)
    }
  }, [action, userObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Add new user'}
            {action === 'edit' && `Edit user`}
            {action === 'delete' && `Delete user`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && <UserForm type="add" userObj={null} closeDialog={closeDialog} />}
          {action === 'edit' && userData && <UserForm type="edit" userObj={userData} closeDialog={closeDialog} />}
          {action === 'delete' && userData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete the user{' '}
                <span className="font-semibold">{userData.name}</span>? This action cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={deleteUser.isPending}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteUser.mutateAsync({ id: userData._id })
                    closeDialog()
                  }}
                >
                  {deleteUser.isPending ? 'Deleting...' : 'Delete User'}
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

export default UserDialog 