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
import { useCreateProgrammeMutation, useEditProgrammeMutation } from '../-mutations'
import type { Programme } from '@/types'

const programmeSchema = z.object({
  name: z.string().nonempty('Programme name is required'),
})

interface ProgramFormProps {
  closeDialog: () => void
  type: 'add' | 'edit'
  programmeObj: Programme | null
}

const ProgrammeForm = ({
  closeDialog,
  programmeObj,
  type,
}: ProgramFormProps) => {
  const form = useForm<z.infer<typeof programmeSchema>>({
    defaultValues:
      type === 'edit' && programmeObj
        ? { name: programmeObj.name }
        : { name: '' },
    resolver: zodResolver(programmeSchema),
  })

  const createProgramme = useCreateProgrammeMutation()
  const editProgramme = useEditProgrammeMutation()

  const onSubmit = async (data: z.infer<typeof programmeSchema>) => {
    if (type === 'edit' && programmeObj) {
      await editProgramme.mutateAsync({ id: programmeObj._id, ...data })
    } else if (type === 'add') {
      await createProgramme.mutateAsync(data)
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
                Programme Name
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter programme name" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-3">
          {type === 'add' && (
            <Button
              disabled={createProgramme.isPending}
              type="submit"
              className="h-10"
            >
              {createProgramme.isPending ? 'Adding...' : 'Add Programme'}
            </Button>
          )}
          {type === 'edit' && programmeObj && (
            <Button
              disabled={editProgramme.isPending}
              type="submit"
              className="h-10"
            >
              {editProgramme.isPending ? 'Editing...' : 'Edit Programme'}
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

export default ProgrammeForm
