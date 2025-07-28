import type { useAppData } from "./hooks/use-app-data"

export type User = ReturnType<typeof useAppData>['users'][0]
export type Class = ReturnType<typeof useAppData>['classes'][0]
export type Student = ReturnType<typeof useAppData>['students'][0]
export type Programme = ReturnType<typeof useAppData>['programmes'][0]
export type Tablet = ReturnType<typeof useAppData>['tablets'][0]
export type Submissions = ReturnType<typeof useAppData>['submissions'][0]
export type Confiscation = ReturnType<typeof useAppData>['confiscations'][0]