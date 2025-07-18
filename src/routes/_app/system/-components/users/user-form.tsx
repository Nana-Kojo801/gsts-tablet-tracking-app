import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useCreateUserMutation, useEditUserMutation } from '@/mutations'
import type { User } from '@/types'

interface UserFormProps {
  closeDialog: () => void
  type: 'add' | 'edit'
  userObj: User | null
}

const userSchema = z.object({
  name: z.string().nonempty('Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.union([z.literal('admin'), z.literal('user')]),
})

const UserForm = ({ closeDialog, type, userObj }: UserFormProps) => {
  const createUser = useCreateUserMutation()
  const editUser = useEditUserMutation()

  const form = useForm<z.infer<typeof userSchema>>({
    defaultValues:
      type === 'edit' && userObj
        ? { name: userObj.name, role: userObj.role }
        : { name: '', role: 'user' },
    resolver: zodResolver(userSchema),
  })

  const handleSubmit = async (values: z.infer<typeof userSchema>) => {
    if (type === 'edit' && userObj) {
      await editUser.mutateAsync({ id: userObj._id, ...values })
    } else {
      await createUser.mutateAsync(values)
    }
    closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter user name" className="h-10" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-3">
          {type === 'add' && (
            <Button disabled={createUser.isPending} type="submit" className="h-10">
              {createUser.isPending ? 'Adding...' : 'Add User'}
            </Button>
          )}
          {type === 'edit' && userObj && (
            <Button disabled={editUser.isPending} type="submit" className="h-10">
              {editUser.isPending ? 'Editing...' : 'Edit User'}
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

export default UserForm 