import type { Submissions } from '@/types'

export type DialogState = {
  open: boolean
  action: 'add' | 'delete' | null
  submissionObj: Submissions | null
} 