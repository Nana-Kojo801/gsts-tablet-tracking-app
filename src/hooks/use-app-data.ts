import {
  fetchUsersQueryOptions,
  fetchStudentsQueryOptions,
  fetchProgrammesQueryOptions,
  fetchClassesQueryOptions,
  fetchTabletsQueryOptions,
  fetchSubmissionsQueryOptions,
} from '@/queries'
import { useSuspenseQueries } from '@tanstack/react-query'

export const useAppData = () => {
  const [
    { data: users },
    { data: students },
    { data: programmes },
    { data: classes },
    { data: tablets },
    { data: submissions }
  ] = useSuspenseQueries({
    queries: [
      fetchUsersQueryOptions(),
      fetchStudentsQueryOptions(),
      fetchProgrammesQueryOptions(),
      fetchClassesQueryOptions(),
      fetchTabletsQueryOptions(),
      fetchSubmissionsQueryOptions()
    ],
  })

  return {
    users,
    students,
    programmes,
    classes,
    tablets,
    submissions: submissions.map(submission => {
      const student = students.find(s => s._id === submission.studentId)!
      const user = users.find(u => u._id === submission.receivedById)!
      return { ...submission, student, receivedBy: user }
    })
  }
}
