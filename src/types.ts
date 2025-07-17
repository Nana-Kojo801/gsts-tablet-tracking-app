import { type Doc } from "@convex/_generated/dataModel"

export type User = Doc<"users">
export type Class = Doc<"classes">
export type Student = Doc<"students"> & { programme: string; class: string; tablet: string }
export type Programme = Doc<"programmes">
export type Tablet = Doc<"tablets">
export type Submissions = Doc<"submissions"> & { receivedBy: User; student: Student }