import {
  fetchUsersQueryOptions,
  fetchStudentsQueryOptions,
  fetchProgrammesQueryOptions,
  fetchClassesQueryOptions,
  fetchTabletsQueryOptions,
} from '@/queries'
import { useSuspenseQueries } from '@tanstack/react-query'

export const useAppData = () => {
  const [
    { data: users },
    { data: students },
    { data: programmes },
    { data: classes },
    { data: tablets },
  ] = useSuspenseQueries({
    queries: [
      fetchUsersQueryOptions(),
      fetchStudentsQueryOptions(),
      fetchProgrammesQueryOptions(),
      fetchClassesQueryOptions(),
      fetchTabletsQueryOptions(),
    ],
  })

  return {
    users,
    students,
    programmes,
    classes,
    tablets,
  }
}
