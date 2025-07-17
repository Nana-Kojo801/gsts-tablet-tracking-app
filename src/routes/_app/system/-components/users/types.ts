import type { User } from '@/types'

export type DialogState = {
  open: boolean
  action: 'add' | 'edit' | 'delete' | null
  userObj: User | null
} 