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
import { useMemo } from 'react'

export function isFriday(date: Date) {
  return date.getDay() === 5 // 0=Sunday, 5=Friday
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
    if (!isFri && s.status === 'Boarder') return false
    const hasSubmitted = submissions.some(
      (sub) =>
        sub.studentId === s._id &&
        new Date(sub.submissionTime).toISOString().slice(0, 10) === dateStr,
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

  // Memoize the expensive transformations
  const processedData = useMemo(() => {
    // Create lookup maps for O(1) access instead of O(n) finds
    const programmeMap = new Map(programmeEntries.map((p) => [p._id, p.name]))
    const classMap = new Map(classEntries.map((c) => [c._id, c.name]))
    const tabletMap = new Map(tabletEntries.map((t) => [t._id, t]))
    const userMap = new Map(userEntries.map((u) => [u._id, u]))

    // Transform students with O(n) complexity instead of O(n²)
    const students = studentEntries.map((student) => {
      const programme = programmeMap.get(student.programmeId)
      const className = classMap.get(student.classId)
      const tablet = student.tabletId
        ? tabletMap.get(student.tabletId) || null
        : null

      return {
        ...student,
        tablet,
        programme,
        class: className,
      }
    })

    // Create student lookup map for submissions
    const studentMap = new Map(students.map((s) => [s._id, s]))

    // Transform submissions with O(n) complexity
    const submissions = submissionEntries.map((submission) => {
      const student = studentMap.get(submission.studentId)
      const receivedBy = userMap.get(submission.receivedById)
      return { ...submission, student, receivedBy }
    })

    // Count students per class efficiently
    const studentCountByClass = new Map()
    students.forEach((student) => {
      const count = studentCountByClass.get(student.classId) || 0
      studentCountByClass.set(student.classId, count + 1)
    })

    // Transform classes with O(n) complexity
    const classes = classEntries.map((classEntry) => ({
      ...classEntry,
      students: studentCountByClass.get(classEntry._id) || 0,
    }))

    return {
      users: userEntries,
      students,
      programmes: programmeEntries,
      classes,
      tablets: tabletEntries,
      submissions,
    }
  }, [
    userEntries,
    studentEntries,
    programmeEntries,
    classEntries,
    tabletEntries,
    submissionEntries,
  ])

  return processedData
}
