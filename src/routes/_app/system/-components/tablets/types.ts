import type { Tablet } from '@/types'

export type DialogState = {
  open: boolean
  action: 'add' | 'edit' | 'delete' | null
  tabletObj: Tablet | null
} 