import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useCreateClassMutation, useEditClassMutation } from '@/mutations'
import type { Class } from '@/types'

const classSchema = z.object({
  name: z.string().nonempty('Class name is required'),
})

interface ClassFormProps {
  closeDialog: () => void
  type: 'add' | 'edit'
  classObj: Class | null
}

const ClassForm = ({
  closeDialog,
  classObj,
  type,
}: ClassFormProps) => {
  const form = useForm<z.infer<typeof classSchema>>({
    defaultValues:
      type === 'edit' && classObj
        ? { name: classObj.name }
        : { name: '' },
    resolver: zodResolver(classSchema),
  })

  const createClass = useCreateClassMutation()
  const editClass = useEditClassMutation()

  const onSubmit = async (data: z.infer<typeof classSchema>) => {
    if (type === 'edit' && classObj) {
      await editClass.mutateAsync({ id: classObj._id, ...data })
    } else if (type === 'add') {
      await createClass.mutateAsync(data)
    }
    closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Class Name
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter class name" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-3">
          {type === 'add' && (
            <Button
              disabled={createClass.isPending}
              type="submit"
              className="h-10"
            >
              {createClass.isPending ? 'Adding...' : 'Add Class'}
            </Button>
          )}
          {type === 'edit' && classObj && (
            <Button
              disabled={editClass.isPending}
              type="submit"
              className="h-10"
            >
              {editClass.isPending ? 'Editing...' : 'Edit Class'}
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

export default ClassForm 