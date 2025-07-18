import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import type { Student } from '@/types'
import type { DialogState } from './types'
import StudentForm from './student-form'
import { useDeleteStudentMutation } from '@/mutations'
import { Button } from '@/components/ui/button'

type StudentDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const StudentDialog = ({ dialogState, closeDialog }: StudentDialogProps) => {
  const [studentData, setStudentData] = useState<Student | null>(
    dialogState.studentObj,
  )
  const { action, open, studentObj } = dialogState

  const deleteStudent = useDeleteStudentMutation()

  useEffect(() => {
    if (action === 'add') {
      setStudentData(null)
    } else if ((action === 'edit' || 'delete') && studentObj) {
      setStudentData(studentObj)
    }
  }, [action, studentObj])

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {action === 'add' && 'Add new student'}
            {action === 'edit' && `Edit student`}
            {action === 'delete' && `Delete student`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add' && (
            <StudentForm
              type="add"
              studentObj={null}
              closeDialog={closeDialog}
            />
          )}
          {action === 'edit' && studentData && (
            <StudentForm
              type="edit"
              studentObj={studentData}
              closeDialog={closeDialog}
            />
          )}
          {action === 'delete' && studentData && (
            <div className="space-y-4">
              <div className="text-red-600">
                Are you sure you want to delete the student{' '}
                <span className="font-semibold">{studentData.name}</span>? This
                action cannot be undone.
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Button
                  disabled={deleteStudent.isPending}
                  type="submit"
                  className="h-10"
                  onClick={async () => {
                    await deleteStudent.mutateAsync({ id: studentData._id })
                    closeDialog()
                  }}
                >
                  {deleteStudent.isPending
                    ? 'Deleting...'
                    : 'Delete Student'}
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

export default StudentDialog
