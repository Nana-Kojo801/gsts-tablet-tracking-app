import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import ConfiscationForm from './confiscation-form'

type CreateConfiscationDialogProps = {
  open: boolean
  closeDialog: () => void
}

const CreateConfiscationDialog = ({ open, closeDialog }: CreateConfiscationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confiscate Device</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ConfiscationForm closeDialog={closeDialog} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateConfiscationDialog
