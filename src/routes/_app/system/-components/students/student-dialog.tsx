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

type StudentDialogProps = {
  dialogState: DialogState
  closeDialog: () => void
}

const StudentDialog = ({ dialogState, closeDialog }: StudentDialogProps) => {
  const [studentData, setStudentData] = useState<Student | null>(
    dialogState.studentObj,
  )
  const { action, open, studentObj } = dialogState

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
          {action === 'add' && <StudentForm type="add" studentObj={null} closeDialog={closeDialog} />}
          {action === 'edit' && studentData && <StudentForm type="edit" studentObj={studentData} closeDialog={closeDialog} />}
          {action === 'delete' && studentData && (
            <div className="text-red-600">
              Are you sure you want to delete the student{' '}
              <span className="font-semibold">{studentData.name}</span>? This
              action cannot be undone.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StudentDialog
