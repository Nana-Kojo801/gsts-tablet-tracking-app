import type { Submissions } from '@/types'

export type DialogState = {
  open: boolean
  action: 'add' | 'edit' | 'delete' | null
  submissionObj: Submissions | null
} 