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
import { useCreateDistributionMutation } from '@/mutations'
import { useAppData } from '@/hooks/use-app-data'
import { useUser } from '@/hooks/user-user'
import type { Class } from '@/types'

const ClassForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const { classes, students } = useAppData()
  const user = useUser()
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  const createDistribution = useCreateDistributionMutation()

  const distributionSchema = z.object({
    classId: z.string().nonempty('Class is required'),
  })

  const form = useForm<z.infer<typeof distributionSchema>>({
    defaultValues: {
      classId: '',
    },
    resolver: zodResolver(distributionSchema),
  })

  const handleSubmit = async () => {
    if (!selectedClass) return
    const payload = students
      .filter(
        (s) =>
          s.tablet && !s.tablet.distributed && s.classId === selectedClass._id,
      )
      .map((student) => ({
        studentId: student._id,
        distributedById: user._id,
        distributionTime: Date.now(),
      }))
    await createDistribution.mutateAsync({ entries: payload })
    closeDialog()
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
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
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
          <div className="relative bg-background border border-border rounded-xl shadow-lg p-3 flex flex-col sm:flex-row gap-3 items-center mb-4 mt-2 overflow-hidden">
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
                  {
                    students.filter((s) => s.class === selectedClass.name)
                      .length
                  }
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full grid grid-cols-2 gap-3">
          <Button
            type="submit"
            className="h-10"
            disabled={createDistribution.isPending}
          >
            {createDistribution.isPending
              ? 'Submitting...'
              : 'Submit Distribution'}
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
