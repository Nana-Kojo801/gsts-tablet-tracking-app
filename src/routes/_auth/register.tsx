import { createFileRoute } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/form'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import Spinner from '@/components/spinner'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  role: z.enum(['admin', 'user']),
})

function RouteComponent() {
  const createUser = useMutation(api.users.create)
  const convex = useConvex()

  const [userPassword, setUserPassword] = useState<string | null>(null)

  const form = useAppForm({
    defaultValues: {
      name: '',
      role: 'user',
    } as z.infer<typeof registerSchema>,
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const existingUser = await convex.query(api.users.getByUsername, {
          name: value.name,
        })

        if(existingUser) throw Error("Username is taken")

        const user = await createUser(value)
        setUserPassword(user.password)
      } catch(e) {
        toast.error((e as Error).message || 'Failed to create account')
      }
    },
  })
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Password Dialog */}
      <Dialog
        open={userPassword !== null}
        onOpenChange={(open) => {
          if (!open) setUserPassword(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Created</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-center">
            <div className="text-lg font-semibold">
              Your temporary password:
            </div>
            <div className="text-2xl font-mono bg-muted rounded px-4 py-2 select-all border border-border inline-block">
              {userPassword}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Please copy and save this password. You will need it to log in.
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="w-full h-10 mt-4 bg-primary text-primary-foreground rounded font-semibold">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* School Logo Watermark Background */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center">
        <div className="text-9xl font-bold text-primary rotate-12">GSTS</div>
      </div>

      {/* Main Register Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Register for GSTS Tablet Tracker Pro
            </h1>
            <p className="text-muted-foreground">
              Create your account to access the tablet management system
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Register Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            {/* Username Field */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-foreground"
              >
                Username
              </Label>
              <form.AppField
                name="name"
                children={(field) => (
                  <field.TextField
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="h-12 px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                )}
              />
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Role
              </Label>
              <form.AppField
                name="role"
                children={(field) => (
                  <field.Select
                    label=""
                    values={[
                      { label: 'User', value: 'user' },
                      { label: 'Admin', value: 'admin' },
                    ]}
                    placeholder="Select a role"
                  />
                )}
              />
            </div>

            <form.AppForm>
              <form.SubscribeButton className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                {form.state.isSubmitting ? <Spinner /> : 'Register'}
              </form.SubscribeButton>
            </form.AppForm>
          </form>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        GSTS Tablet Tracker Pro v1.0
      </div>
    </div>
  )
}
