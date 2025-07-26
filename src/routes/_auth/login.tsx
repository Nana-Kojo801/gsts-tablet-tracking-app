import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { useConvex } from 'convex/react'
import { api } from '@convex/_generated/api'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
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
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  beforeLoad: ({ context: { user }}) => {
    if(user) throw redirect({ to: '/' })
  }
})

const loginSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>

function RouteComponent() {
  const convex = useConvex()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  })

  const onSubmit = async (value: LoginFormValues) => {
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
      window.location.reload()
    } catch(e) {
      toast.error((e as Error).message || 'Failed to login')
    }
  }

  useEffect(() => {
    document.body.classList.add('app-loaded')
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* School Logo Watermark Background */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none select-none">
        <div className="text-6xl sm:text-9xl font-bold text-primary rotate-12">GSTS</div>
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
          {/* Login Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Username Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="h-12 px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="h-12 px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        GSTS Tablet Tracker Pro v1.0
      </div>
    </div>
  )
}
