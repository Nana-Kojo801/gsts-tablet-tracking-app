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
import { Search, User, CheckCircle2 } from 'lucide-react'
import { useCreateSubmissionMutation } from '@/mutations'
import type { Student } from '@/types'
import { useAppData } from '@/hooks/use-app-data'
import { useUser } from '@/hooks/user-user'
import { isFriday } from '@/hooks/use-app-data'

type ClassFormProps = {
  closeDialog: () => void
}

function isToday(date: number) {
  const d = new Date(date)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

const StudentForm = ({ closeDialog }: ClassFormProps) => {
  const { students, submissions } = useAppData()
  const user = useUser()
  const [studentSearch, setStudentSearch] = useState<string | undefined>()
  const [showStudentDropdown, setShowStudentDropdown] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const matchingStudents = studentSearch
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.class?.toLowerCase().includes(studentSearch.toLowerCase()),
      )
    : students

  const createSubmission = useCreateSubmissionMutation()

  const submissionSchema = z.object({
    studentId: z.string().nonempty('Student is required'),
    tabletCondition: z.enum(['Good', 'Bad'], {
      required_error: 'Tablet condition is required',
    }),
  })

  const form = useForm<z.infer<typeof submissionSchema>>({
    defaultValues: {
      studentId: '',
      tabletCondition: 'Good',
    },
    resolver: zodResolver(submissionSchema),
  })

  // Check if selected student has already submitted today
  const hasSubmittedToday = selectedStudent
    ? submissions.some(
        (s) => s.studentId === selectedStudent._id && isToday(s.submissionTime),
      )
    : false

  const todayIsFriday = isFriday(new Date())

  const handleSubmit = async (values: z.infer<typeof submissionSchema>) => {
    if (!selectedStudent) return
    const payload = {
      studentId: selectedStudent._id,
      receivedById: user._id,
      submissionTime: Date.now(),
      condition: values.tabletCondition,
    }
    await createSubmission.mutateAsync({ entries: [payload] })
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
                    placeholder="Search student by name or class..."
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
            {selectedStudent.tablet && hasSubmittedToday && (
              <div className="flex items-center gap-2 mb-2 p-2 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                This student has already submitted today.
              </div>
            )}
            {selectedStudent && selectedStudent.status === 'Boarder' && !todayIsFriday && (
              <div className="flex items-center gap-2 mb-2 p-2 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs font-semibold">
                <User className="w-4 h-4" />
                Boarders can only submit on Friday.
              </div>
            )}
          </>
        )}
        <FormField
          control={form.control}
          name="tabletCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tablet Condition</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Bad">Bad</SelectItem>
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
              createSubmission.isPending ||
              !!hasSubmittedToday ||
              !!(selectedStudent && !selectedStudent.tablet) ||
              (!!selectedStudent && selectedStudent.status === 'Boarder' && !todayIsFriday)
            }
          >
            {!selectedStudent?.tablet
              ? 'No Tablet'
              : hasSubmittedToday
              ? 'Already Submitted'
              : (!!selectedStudent && selectedStudent.status === 'Boarder' && !todayIsFriday)
              ? 'Boarders submit on Friday'
              : createSubmission.isPending
              ? 'Submitting...'
              : 'Submit Collection'}
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

export default StudentForm
