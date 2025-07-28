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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useCreateSubmissionMutation } from '@/mutations'
import { isConfiscatedTablet, useAppData } from '@/hooks/use-app-data'
import { useUser } from '@/hooks/user-user'
import type { Class } from '@/types'
import { CheckCircle2, Users } from 'lucide-react'
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

const ClassForm = ({ closeDialog }: ClassFormProps) => {
  const { classes, students, submissions, confiscations } = useAppData()
  const user = useUser()
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  const createSubmission = useCreateSubmissionMutation()

  const submissionSchema = z.object({
    classId: z.string().nonempty('Class is required'),
    tabletCondition: z.enum(['Good', 'Bad'], {
      required_error: 'Tablet condition is required',
    }),
  })

  const form = useForm<z.infer<typeof submissionSchema>>({
    defaultValues: {
      classId: '',
      tabletCondition: 'Good',
    },
    resolver: zodResolver(submissionSchema),
  })

  const todayIsFriday = isFriday(new Date())

  // Get students in the selected class
  const studentsInClass = selectedClass
    ? students.filter((s) => s.classId === selectedClass._id)
    : []

  // Students in class who have a tablet
  const studentsWithTablet = studentsInClass.filter((s) => s.tablet)
  // Students in class who do not have a tablet
  const studentsWithoutTablet = studentsInClass.filter((s) => !s.tablet)

  const noOneWithTablet = studentsWithTablet.length === 0

  // For each student with a tablet, check if they have submitted today
  const studentsWhoHaveNotSubmitted = studentsWithTablet
    .filter((s) => s.tablet && isConfiscatedTablet(confiscations, s))
    .filter(
      (student) =>
        !submissions.some(
          (s) => s.studentId === student._id && isToday(s.submissionTime),
        ),
    )
  const studentsWithConfiscatedTablets = studentsWithTablet.filter((s) =>
    isConfiscatedTablet(confiscations, s),
  ).length
  // Exclude boarders from pending if not Friday
  const studentsWhoCanSubmit = todayIsFriday
    ? studentsWhoHaveNotSubmitted
    : studentsWhoHaveNotSubmitted.filter((s) => s.status !== 'Boarder')
  const allSubmitted =
    studentsWithTablet.length > 0 && studentsWhoCanSubmit.length === 0
  const onlyBoarders =
    studentsWithTablet.length > 0 &&
    studentsWithTablet.every((s) => s.status === 'Boarder')

  const handleSubmit = async (values: z.infer<typeof submissionSchema>) => {
    if (!selectedClass) return
    const payload = studentsWhoCanSubmit.map((student) => ({
      studentId: student._id,
      receivedById: user._id,
      submissionTime: Date.now(),
      condition: values.tabletCondition,
    }))
    await createSubmission.mutateAsync({ entries: payload })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val)
                    const found = classes.find((c) => c._id === val)
                    setSelectedClass(found || null)
                  }}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-muted border border-primary/20 dark:border-border text-foreground dark:text-foreground">
                    {classes.map((c) => (
                      <SelectItem
                        key={c._id}
                        value={c._id}
                        className="dark:bg-muted dark:text-foreground"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedClass && (
          <>
            <div className="relative bg-background dark:bg-muted border border-border rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center mb-4 mt-2 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-xl" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Class Name
                  </div>
                  <div className="text-base font-bold text-foreground">
                    {selectedClass.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Number of Students
                  </div>
                  <div className="text-base font-medium text-primary">
                    {studentsInClass.length}
                  </div>
                </div>
              </div>
            </div>
            {/* Submission info */}
            <div className="w-full mb-4">
              {selectedClass && studentsWithConfiscatedTablets > 0 && (
                <div className="flex items-center gap-2 p-2 rounded bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-xs font-semibold mb-4">
                  <Users className="w-4 h-4" />
                  {studentsWithConfiscatedTablets} student
                  {studentsWithConfiscatedTablets !== 1 ? 's' : ''} in this
                  class have a confiscated tablet.
                </div>
              )}
              {allSubmitted ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    All students with tablets from this class have submitted
                    today.
                  </div>
                  {studentsWithoutTablet.length > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs font-semibold">
                      <Users className="w-4 h-4" />
                      {noOneWithTablet
                        ? 'All'
                        : studentsWithoutTablet.length}{' '}
                      student{studentsWithoutTablet.length !== 1 ? 's' : ''}{' '}
                      from this class do not have a tablet.
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs font-semibold">
                    <Users className="w-4 h-4" />
                    {studentsWhoCanSubmit.length} student
                    {studentsWhoCanSubmit.length !== 1 ? 's' : ''} from this
                    class have not submitted today (with a tablet).
                  </div>
                  {studentsWithoutTablet.length > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs font-semibold">
                      <Users className="w-4 h-4" />
                      {noOneWithTablet
                        ? 'All'
                        : studentsWithoutTablet.length}{' '}
                      student
                      {studentsWithoutTablet.length !== 1 ? 's' : ''} from this
                      class do not have a tablet.
                    </div>
                  )}
                </div>
              )}
            </div>
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
              allSubmitted ||
              noOneWithTablet ||
              (!todayIsFriday && onlyBoarders)
            }
          >
            {allSubmitted
              ? 'All Submitted'
              : !todayIsFriday && onlyBoarders
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

export default ClassForm
