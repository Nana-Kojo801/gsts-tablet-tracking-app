import { useState, useMemo } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Search, User } from 'lucide-react'
import { useCreateSubmissionMutation } from '@/mutations'
import type { Student, Submissions } from '@/types'
import { useAppData } from '@/hooks/use-app-data'

interface SubmissionFormProps {
  closeDialog: () => void
  type: 'add' | 'edit'
  submissionObj: Submissions | null
}

const SubmissionForm = ({ closeDialog, type, submissionObj }: SubmissionFormProps) => {
  const { students, classes } = useAppData()

  // For student autocomplete
  const initialStudentName = useMemo(() => {
    if (type === 'edit' && submissionObj?.student) {
      return submissionObj.student.name
    }
    return undefined
  }, [type, submissionObj])
  const [studentSearch, setStudentSearch] = useState(initialStudentName)
  const [showStudentDropdown, setShowStudentDropdown] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    type === 'edit' && submissionObj?.student ? submissionObj.student : null
  )
  const matchingStudents = studentSearch
    ? students.filter((s) =>
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.class?.toLowerCase().includes(studentSearch.toLowerCase())
      )
    : students

  const createSubmission = useCreateSubmissionMutation()

  const submissionSchema = z.object({
    studentId: z.string().nonempty('Student is required'),
    collectionStatus: z.union([
      z.literal('on_time'),
      z.literal('late'),
      z.literal('missing')
    ]),
    allComponentsPresent: z.boolean().refine((val) => val === true, {
      message: 'All components must be present',
    }),
  })

  const form = useForm<z.infer<typeof submissionSchema>>({
    defaultValues:
      type === 'edit' && submissionObj
        ? {
            studentId: submissionObj.student._id || '',
            collectionStatus: 'on_time', // Default value since this field doesn't exist in current schema
            allComponentsPresent: true, // Default value since this field doesn't exist in current schema
          }
        : {
            studentId: '',
            collectionStatus: 'on_time',
            allComponentsPresent: false,
          },
    resolver: zodResolver(submissionSchema),
  })

  const handleSubmit = async (values: z.infer<typeof submissionSchema>) => {
    if (!selectedStudent) return

    const payload = {
      studentId: selectedStudent._id,
      receivedById: 'current-user-id', // This should come from auth context
      submissionTime: Date.now(),
    }

    if (type === 'add') {
      await createSubmission.mutateAsync(payload)
    }
    // Note: No edit mutation exists for submissions currently
    closeDialog()
  }

  // On blur, if the student name is not in the list, clear the field
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
        {/* Student Search */}
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
                    value={selectedStudent ? selectedStudent.name : studentSearch ?? ''}
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
                    <div className="absolute z-20 bg-white border border-primary/20 rounded-lg w-full max-h-40 overflow-y-auto shadow-2xl mt-1 animate-fade-in p-1">
                      {matchingStudents.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-muted-foreground text-center select-none">
                          No students found
                        </div>
                      ) : (
                        matchingStudents.map((s) => (
                          <div
                            key={s._id}
                            className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors rounded-lg text-xs mb-0.5 ${selectedStudent?._id === s._id ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-primary/5'}`}
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

        {/* Collection Status */}
        <FormField
          control={form.control}
          name="collectionStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on_time">On Time</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="missing">Missing</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* All Components Present */}
        <FormField
          control={form.control}
          name="allComponentsPresent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>All components present</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="w-full grid grid-cols-2 gap-3">
          {type === 'add' && (
            <Button
              disabled={createSubmission.isPending}
              type="submit"
              className="h-10"
            >
              {createSubmission.isPending ? 'Submitting..' : 'Submit Collection'}
            </Button>
          )}
          <Button onClick={closeDialog} variant="outline" className="h-10">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SubmissionForm 