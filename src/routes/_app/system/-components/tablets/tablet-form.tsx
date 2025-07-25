import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useCreateTabletMutation, useEditTabletMutation } from '@/mutations'
import type { Tablet } from '@/types'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

const tabletSchema = z.object({
  imei: z.string().nonempty('Tablet IMEI is required'),
  bagNumber: z.string().nonempty('Bag number is required'),
  status: z.union([z.literal('active'), z.literal('lost'), z.literal('confiscated')]),
})

type TabletFormProps = {
  closeDialog: () => void
  type: 'add' | 'edit'
  tabletObj: Tablet | null
}

const TabletForm = ({ closeDialog, tabletObj, type }: TabletFormProps) => {
  const form = useForm<z.infer<typeof tabletSchema>>({
    defaultValues:
      type === 'edit' && tabletObj
        ? { imei: tabletObj.imei, status: tabletObj.status, bagNumber: tabletObj.bagNumber }
        : { imei: '', bagNumber: '', status: 'active' },
    resolver: zodResolver(tabletSchema),
  })

  const createTablet = useCreateTabletMutation()
  const editTablet = useEditTabletMutation()

  const onSubmit = async (data: z.infer<typeof tabletSchema>) => {
    if (type === 'edit' && tabletObj) {
      await editTablet.mutateAsync({ id: tabletObj._id, ...data })
    } else if (type === 'add') {
      await createTablet.mutateAsync(data)
    }
    closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="imei"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tablet IMEI</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter tablet IMEI" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bagNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bag number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter bag number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="confiscated">Confiscated</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-3">
          {type === 'add' && (
            <Button
              disabled={createTablet.isPending}
              type="submit"
              className="h-10"
            >
              {createTablet.isPending ? 'Adding...' : 'Add Tablet'}
            </Button>
          )}
          {type === 'edit' && tabletObj && (
            <Button
              disabled={editTablet.isPending}
              type="submit"
              className="h-10"
            >
              {editTablet.isPending ? 'Editing...' : 'Edit Tablet'}
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

export default TabletForm 