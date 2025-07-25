import {
  fetchUsersQueryOptions,
  fetchStudentsQueryOptions,
  fetchProgrammesQueryOptions,
  fetchClassesQueryOptions,
  fetchTabletsQueryOptions,
  fetchSubmissionsQueryOptions,
} from '@/queries'
import type { Student, Submissions } from '@/types'
import { useSuspenseQueries } from '@tanstack/react-query'

export function isFriday(date: Date) {
  return date.getDay() === 5 // 0=Sunday, 5=Friday
}

export function getPendingSubmissionStudents(date: Date, students: Student[], submissions: Submissions[]) {
  const isFri = isFriday(date)
  const dateStr = date.toISOString().slice(0, 10)
  // Only count boarders on Friday
  return students.filter((s) => {
    if (!isFri && s.status === 'Boarder') return false
    const hasSubmitted = submissions.some(
      (sub) => sub.studentId === s._id && new Date(sub.submissionTime).toISOString().slice(0, 10) === dateStr
    )
    return !hasSubmitted
  })
}

export const useAppData = () => {
  const [
    { data: userEntries },
    { data: studentEntries },
    { data: programmeEntries },
    { data: classEntries },
    { data: tabletEntries },
    { data: submissionEntries },
  ] = useSuspenseQueries({
    queries: [
      fetchUsersQueryOptions(),
      fetchStudentsQueryOptions(),
      fetchProgrammesQueryOptions(),
      fetchClassesQueryOptions(),
      fetchTabletsQueryOptions(),
      fetchSubmissionsQueryOptions(),
    ],
  })

  const users = userEntries
  const tablets = tabletEntries
  const programmes = programmeEntries

  const students = studentEntries.map((student) => {
    const programme = programmes.find(p => p._id === student.programmeId)!.name
    const className = classEntries.find(c => c._id === student.classId)!.name
    if (student.tabletId) {
      const tablet = tablets.find((t) => student.tabletId === t._id) || null
      return { ...student, tablet, programme, class: className }
    } else return { ...student, tablet: null, programme, class: className }
  })

  const submissions = submissionEntries.map((submission) => {
    const student = students.find((s) => s._id === submission.studentId)!
    const receivedBy = users.find((u) => u._id === submission.receivedById)!
    return { ...submission, student, receivedBy }
  })

  const classes = classEntries.map((classEntry) => {
    return {
      ...classEntry,
      students: students.filter((s) => s.classId === classEntry._id).length,
    }
  })

  return {
    users,
    students,
    programmes,
    classes,
    tablets,
    submissions
  }
}
