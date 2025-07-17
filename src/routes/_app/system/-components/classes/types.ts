import type { Class } from "@/types";

export interface DialogState {
    open: boolean
    action: 'add' | 'edit' | 'delete' | null
    classObj: Class | null
  }
  