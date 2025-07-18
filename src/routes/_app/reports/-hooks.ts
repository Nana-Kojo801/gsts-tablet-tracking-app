import { useAppData } from '@/hooks/use-app-data'
import dayjs from 'dayjs'

export function useChartData(filterState: {
  dateRange: 'today' | '7days' | '30days' | 'custom'
  customStart: string
  customEnd: string
  selectedClass: string
  selectedStatus: string
  selectedProgramme: string
  startOpen: boolean
  endOpen: boolean
}) {
  const { students, distributions, submissions } = useAppData()
  // Calculate date range
  let startDate: dayjs.Dayjs
  let endDate = dayjs().endOf('day')
  if (filterState.dateRange === 'today') {
    startDate = dayjs().startOf('day')
  } else if (filterState.dateRange === '7days') {
    startDate = dayjs().subtract(6, 'day').startOf('day')
  } else if (filterState.dateRange === '30days') {
    startDate = dayjs().subtract(29, 'day').startOf('day')
  } else {
    startDate = dayjs(filterState.customStart).startOf('day')
    endDate = dayjs(filterState.customEnd).endOf('day')
  }

  // Filter students
  const filteredStudents = students.filter((s) => {
    const classMatch =
      filterState.selectedClass === 'all' ||
      s.class === filterState.selectedClass
    const programmeMatch =
      filterState.selectedProgramme === 'all' ||
      s.programme === filterState.selectedProgramme
    const statusMatch =
      filterState.selectedStatus === 'all' ||
      s.status === filterState.selectedStatus
    return classMatch && programmeMatch && statusMatch
  })

  // Filter distributions and submissions by student and date
  const filteredDistributions = distributions.filter((d) => {
    const student = students.find((s) => s._id === d.studentId)
    if (!student) return false
    const studentMatch = filteredStudents.some((s) => s._id === student._id)
    const dateMatch = dayjs(d.distributionTime).isBetween(
      startDate,
      endDate,
      null,
      '[]',
    )
    return studentMatch && dateMatch
  })
  const filteredSubmissions = submissions.filter((s) => {
    const student = students.find((st) => st._id === s.studentId)
    if (!student) return false
    const studentMatch = filteredStudents.some((st) => st._id === student._id)
    const dateMatch = dayjs(s.submissionTime).isBetween(
      startDate,
      endDate,
      null,
      '[]',
    )
    return studentMatch && dateMatch
  })

  // Prepare chart data for the selected range
  const daysCount =
    filterState.dateRange === 'today'
      ? 1
      : filterState.dateRange === '30days'
        ? 30
        : 7
  const days = Array.from({ length: daysCount }).map((_, i) =>
    startDate.add(i, 'day'),
  )
  const chartData = days.map((d) => {
    const dateStr = d.format('YYYY-MM-DD')
    return {
      date: d.format(daysCount > 7 ? 'MMM D' : 'ddd, MMM D'),
      distributions: filteredDistributions.filter(
        (dist) => dayjs(dist.distributionTime).format('YYYY-MM-DD') === dateStr,
      ).length,
      submissions: filteredSubmissions.filter(
        (sub) => dayjs(sub.submissionTime).format('YYYY-MM-DD') === dateStr,
      ).length,
    }
  })

  // Totals for selected range
  const totalDistributionsInRange = filteredDistributions.length
  const totalSubmissionsInRange = filteredSubmissions.length

  return {
    chartData,
    filteredDistributions,
    filteredSubmissions,
    totalDistributionsInRange,
    totalSubmissionsInRange,
    filteredStudents,
  }
}
