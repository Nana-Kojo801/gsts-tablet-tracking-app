import type { Student } from '@/types'

export type DialogState = {
  open: boolean
  action: 'add' | 'edit' | 'delete' | null
  studentObj: Student | null
} 