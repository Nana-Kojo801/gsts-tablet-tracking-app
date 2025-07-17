import type { Programme } from '@/types'

export type DialogState = {
  open: boolean
  action: 'add' | 'edit' | 'delete' | null
  programmeObj: Programme | null
} 