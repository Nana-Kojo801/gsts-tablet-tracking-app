import type { Student, Submissions } from '@/types'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export function isFriday(date: Date) {
  return date.getDay() === 5 // 0=Sunday, 5=Friday
}

export function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6 // 0=Sunday, 6=Saturday
}

export function getPendingSubmissionStudents(
  date: Date,
  students: Student[],
  submissions: Submissions[],
) {
  const isFri = isFriday(date)
  const dateStr = date.toISOString().slice(0, 10)
  // Only count boarders on Friday
  return students.filter((s) => {
    if (isWeekend(date)) return false // Skip weekends
    if (!isFri && s.status === 'Boarder') return false
    if(!s.tablet || (s.tablet && s.tablet.status === "confiscated")) return false
    const hasSubmitted = submissions.some(
      (sub) =>
        sub.studentId === s._id &&
        new Date(sub.submissionTime).toISOString().slice(0, 10) === dateStr,
    )
    return !hasSubmitted
  })
}

export const useAppData = () => {
  const { data } = useSuspenseQuery(convexQuery(api.data.getAllData, {}))
  return data
}
