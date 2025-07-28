import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Search, User } from 'lucide-react'
import type { Student } from '@/types'
import { useAppData } from '@/hooks/use-app-data'
import { useCreateConfiscationMutation } from '@/mutations'

type ConfiscationFormProps = {
  closeDialog: () => void
}

const reasonsPreset = [
  'Using device during class hours without permission',
  'Using device in prohibited areas',
  'Tampering with device settings',
  'Unauthorized app usage',
  'Disruptive behavior with device',
  'Accessing inappropriate content',
  'Using device for gaming during lessons',
  'Using device to cheat during exams',
  'Downloading unauthorized applications',
]

const ConfiscationForm = ({ closeDialog }: ConfiscationFormProps) => {
  const { students } = useAppData()
  const [studentSearch, setStudentSearch] = useState<string | undefined>()
  const [showStudentDropdown, setShowStudentDropdown] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const matchingStudents = studentSearch
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.indexNumber.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.tablet?.imei.toLowerCase().includes(studentSearch.toLowerCase()),
      )
    : students

  const createConfiscation = useCreateConfiscationMutation()


  const confiscationSchema = z.object({
    studentId: z.string().nonempty('Student is required'),
    reason: z.string().nonempty('Reason is required'),
  })

  const form = useForm<z.infer<typeof confiscationSchema>>({
    defaultValues: {
      studentId: '',
      reason: reasonsPreset[5],
    },
    resolver: zodResolver(confiscationSchema),
  })

  const handleSubmit = async (values: z.infer<typeof confiscationSchema>) => {
    if (!selectedStudent) return
    const payload = {
      studentId: selectedStudent._id,
      confiscationTime: Date.now(),
      reason: values.reason,
    }
    await createConfiscation.mutateAsync(payload)
    closeDialog()
  }

  const handleStudentBlur = () => {
    setTimeout(() => setShowStudentDropdown(false), 100)
    if (!studentSearch || !selectedStudent) {
      setSelectedStudent(null)
      form.setValue('studentId', '')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Search className="w-4 h-4" />
                  </span>
                  <Input
                    placeholder="Search student by name, index no, imei no..."
                    value={
                      selectedStudent
                        ? selectedStudent.name
                        : (studentSearch ?? '')
                    }
                    onChange={(e) => {
                      const val = e.target.value
                      setStudentSearch(val === '' ? undefined : val)
                      setSelectedStudent(null)
                      setShowStudentDropdown(true)
                      field.onChange('')
                    }}
                    onFocus={() => setShowStudentDropdown(true)}
                    onBlur={handleStudentBlur}
                    autoComplete="off"
                    className="h-10 pl-9"
                  />
                  {showStudentDropdown && (
                    <div className="absolute z-20 bg-white dark:bg-muted border border-primary/20 dark:border-border rounded-lg w-full max-h-40 overflow-y-auto shadow-2xl mt-1 animate-fade-in p-1">
                      {matchingStudents.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-muted-foreground text-center select-none">
                          No students found
                        </div>
                      ) : (
                        matchingStudents.map((s) => (
                          <div
                            key={s._id}
                            className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors rounded-lg text-xs mb-0.5 ${selectedStudent?._id === s._id ? 'bg-primary/10 font-semibold text-primary dark:bg-primary/20 dark:text-primary' : 'hover:bg-primary/5 dark:hover:bg-primary/10'}`}
                            onMouseDown={() => {
                              setSelectedStudent(s)
                              setStudentSearch(s.name)
                              setShowStudentDropdown(false)
                              field.onChange(s._id)
                            }}
                          >
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="tracking-wider">
                              {s.name} ({s.class || 'No Class'})
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedStudent && (
          <>
            <div className="relative bg-background dark:bg-muted border border-border rounded-xl shadow-lg p-3 flex flex-col gap-2 mb-4 mt-2 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-xl" />
              <div className="flex-1 grid grid-cols-2 items-center gap-4">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Name
                  </div>
                  <div className="text-base font-bold text-foreground truncate">
                    {selectedStudent.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Tablet IMEI
                  </div>
                  <div className="text-base font-medium">
                    {selectedStudent.tablet?.imei || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            {/* Info boxes below details */}
            {!selectedStudent.tablet && (
              <div className="flex items-center gap-2 mb-2 p-2 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs font-semibold">
                <User className="w-4 h-4" />
                This student does not have a tablet.
              </div>
            )}
            {selectedStudent &&
              selectedStudent.tablet &&
              selectedStudent.tablet.status === 'confiscated' && (
                <div className="flex items-center gap-2 p-2 rounded bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-xs font-semibold mb-4">
                  <User className="w-4 h-4" />
                  This student's tablet has already been confiscated
                </div>
              )}
          </>
        )}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasonsPreset.map((reason, index) => (
                      <SelectItem key={index} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-3">
          <Button
            type="submit"
            className="h-10"
            disabled={
              selectedStudent === null ||
              !!(selectedStudent && selectedStudent.tablet === null) ||
              !!(
                selectedStudent &&
                selectedStudent.tablet &&
                selectedStudent.tablet.status === 'confiscated'
              ) || createConfiscation.isPending
            }
          >
            {selectedStudent && !selectedStudent.tablet
              ? 'No Tablet'
              : createConfiscation.isPending ? 'Confiscating...' : 'Confiscate Tablet'}
          </Button>
          <Button
            onClick={closeDialog}
            variant="outline"
            className="h-10"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ConfiscationForm
