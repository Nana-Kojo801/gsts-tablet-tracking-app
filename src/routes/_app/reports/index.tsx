import { createFileRoute } from '@tanstack/react-router'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

import TabletConditionAnalyticsChart from './-components/submission-compliance-chart'
import NonComplianceTrendsChart from './-components/non-compliance-trends-chart'
import CustomReportGenerator from './-components/custom-report-generator'
import { useState } from 'react'

export const Route = createFileRoute('/_app/reports/')({
  component: ReportsPage,
})

function ReportsPage() {
  // Filters state (default date = today)
  const [reportType, setReportType] = useState('daily')
  const [date, setDate] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 p-2 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Generate reports and view analytics
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <TabletConditionAnalyticsChart
            date={date}
            selectedClass={selectedClass}
            selectedStatus={selectedStatus}
          />
        </div>
        <div className="flex-1">
          <NonComplianceTrendsChart
            date={date}
            selectedClass={selectedClass}
            selectedStatus={selectedStatus}
          />
        </div>
      </div>

      {/* Custom Report Generator */}
      <CustomReportGenerator
        reportType={reportType}
        setReportType={setReportType}
        date={date}
        setDate={setDate}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  )
}
