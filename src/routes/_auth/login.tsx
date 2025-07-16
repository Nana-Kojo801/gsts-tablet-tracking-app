import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Label } from '@/components/ui/label'
import { useAppForm } from '@/hooks/form'
import { z } from 'zod'
import Spinner from '@/components/spinner'
import { useConvex } from 'convex/react'
import { api } from '@convex/_generated/api'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

const loginSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  password: z.string(),
})

function RouteComponent() {
  const convex = useConvex()
  const navigate = useNavigate()

  const form = useAppForm({
    defaultValues: {
      name: '',
      password: '',
    } as z.infer<typeof loginSchema>,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const user = await convex.query(api.users.getByUsername, {
          name: value.name,
        })
        if (!user) {
          throw Error('User not found')
        }
        if(user.password !== value.password) {
          throw Error('Username or password is incorrect')
        }
        localStorage.setItem('session-userId', user._id)
        navigate({ to: '/'})
      } catch(e) {
        toast.error((e as Error).message || 'Failed to login')
      }
    },
  })
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
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
              GSTS Tablet Tracker Pro
            </h1>
            <p className="text-muted-foreground">
              Login to access the tablet management system
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
                Password
              </Label>
              <form.AppField
                name="password"
                children={(field) => (
                  <field.TextField
                    id="username"
                    type="password"
                    placeholder="Enter your username"
                    className="h-12 px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                )}
              />
            </div>

            <form.AppForm>
              <form.SubscribeButton className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                {form.state.isSubmitting ? <Spinner /> : 'Login'}
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
