import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useUser } from '@/hooks/user-user'
import { useState } from 'react'
import { useEditUserMutation } from '@/mutations'

const accountSchema = z
  .object({
    name: z.string().nonempty('Username is required'),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

export function AccountSettings() {
  const user = useUser()
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const editUser = useEditUserMutation()

  const form = useForm<z.infer<typeof accountSchema>>({
    defaultValues: {
      name: user.name,
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(accountSchema),
  })

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    if (values.newPassword)
      await editUser.mutateAsync({
        id: user._id,
        name: values.name,
        password: values.newPassword,
      })
    else await editUser.mutateAsync({ id: user._id, name: values.name })
    setEditDialogOpen(false)
  }

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Account</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Username</div>
          <div className="text-lg font-semibold text-foreground">
            {user.name}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Password</div>
          <div className="text-lg font-semibold text-foreground tracking-widest">
            ••••••••
          </div>
        </div>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-2 md:mt-0">
              Edit Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Account</DialogTitle>
              <DialogDescription>
                Update your username and password below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="grid grid-cols-2">
                  <Button
                    disabled={editUser.isPending}
                    type="submit"
                    className="w-full"
                  >
                    {editUser.isPending ? 'Saving...' : 'Save'}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
