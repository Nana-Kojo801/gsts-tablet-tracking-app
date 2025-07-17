import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { Tablet } from '@/types'
import type { DialogState } from './types'
import TabletForm from './tablet-form'
import { useDeleteTabletMutation } from '../-mutations'

type TabletDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const TabletDialog = ({ dialogState, closeDialog }: TabletDialogProps) => {
  const [tabletData, setTabletData] = useState<Tablet | null>(dialogState.tabletObj)
  const { action, open, tabletObj } = dialogState

  const { mutateAsync: deleteTablet, isPending: isDeletingTablet } = useDeleteTabletMutation()

  useEffect(() => {
    if (action === 'add') {
      setTabletData(null)
    } else if ((action === 'edit' || 'delete') && tabletObj) {
      setTabletData(tabletObj)
    }
  }, [action, tabletObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Add new tablet'}
            {action === 'edit' && `Edit tablet`}
            {action === 'delete' && `Delete tablet`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && (
            <TabletForm type="add" tabletObj={null} closeDialog={closeDialog} />
          )}
          {action === 'edit' && tabletData && (
            <TabletForm type="edit" tabletObj={tabletData} closeDialog={closeDialog} />
          )}
          {action === 'delete' && tabletData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete the tablet{' '}
                <span className="font-semibold">{tabletData.imei}</span>? This action cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={isDeletingTablet}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteTablet({ id: tabletData._id })
                    closeDialog()
                  }}
                >
                  {isDeletingTablet ? 'Deleting...' : 'Delete Tablet'}
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

export default TabletDialog 