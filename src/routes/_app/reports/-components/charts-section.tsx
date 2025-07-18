import dayjs from 'dayjs'
import { useAppData } from '@/hooks/use-app-data'
import { useState } from 'react'
import ChartsFilter from './charts-filter'
import { useChartData } from '../-hooks'
import ChartsAnalytics from './charts-analytics'

const ChartsSection = () => {
  const {
    classes,
    programmes,
  } = useAppData()

  // Single filter state object
  const [filterState, setFilterState] = useState({
    dateRange: '7days' as 'today' | '7days' | '30days' | 'custom',
    customStart: dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
    customEnd: dayjs().format('YYYY-MM-DD'),
    selectedClass: 'all',
    selectedStatus: 'all',
    selectedProgramme: 'all',
    startOpen: false,
    endOpen: false,
  })

  // Get filter options
  const classOptions = classes.map((c) => ({ value: c.name, label: c.name }))
  const programmeOptions = programmes.map((p) => ({ value: p.name, label: p.name }))
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Day', label: 'Day' },
    { value: 'Boarder', label: 'Boarder' },
  ]

  const {
    chartData,
    totalDistributionsInRange,
    totalSubmissionsInRange,
  } = useChartData(filterState)

  return (
    <div className='space-y-3'>
      <ChartsFilter
        filterState={filterState}
        setFilterState={setFilterState}
        classOptions={classOptions}
        programmeOptions={programmeOptions}
        statusOptions={statusOptions}
      />
      <ChartsAnalytics
        chartData={chartData}
        totalDistributionsInRange={totalDistributionsInRange}
        totalSubmissionsInRange={totalSubmissionsInRange}
      />
    </div>
  )
}

export default ChartsSection
