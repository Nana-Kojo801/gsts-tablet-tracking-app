import {
  fetchUsersQueryOptions,
  fetchStudentsQueryOptions,
  fetchProgrammesQueryOptions,
  fetchClassesQueryOptions,
  fetchTabletsQueryOptions,
  fetchSubmissionsQueryOptions,
  fetchDistributionsQueryOptions,
} from '@/queries'
import { useSuspenseQueries } from '@tanstack/react-query'

export const useAppData = () => {
  const [
    { data: userEntries },
    { data: studentEntries },
    { data: programmeEntries },
    { data: classEntries },
    { data: tabletEntries },
    { data: submissionEntries },
    { data: distributionEntries },
  ] = useSuspenseQueries({
    queries: [
      fetchUsersQueryOptions(),
      fetchStudentsQueryOptions(),
      fetchProgrammesQueryOptions(),
      fetchClassesQueryOptions(),
      fetchTabletsQueryOptions(),
      fetchSubmissionsQueryOptions(),
      fetchDistributionsQueryOptions()
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

  const distributions = distributionEntries.map((distribution) => {
    const student = students.find((s) => s._id === distribution.studentId)!
    const distributedBy = users.find((u) => u._id === distribution.distributedById)!
    return { ...distribution, student, distributedBy }
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
    submissions,
    distributions
  }
}
