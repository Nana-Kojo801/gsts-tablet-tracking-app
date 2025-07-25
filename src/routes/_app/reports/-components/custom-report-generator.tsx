import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getPendingSubmissionStudents, useAppData } from '@/hooks/use-app-data'
import { FileDown } from 'lucide-react'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'
import { toast } from 'sonner'

const reportTypes = [
  { value: 'daily', label: 'Daily Submission' },
  { value: 'weekly', label: 'Weekly Submission' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Day', label: 'Day Student' },
  { value: 'Boarder', label: 'Boarder' },
]

interface CustomReportGeneratorProps {
  reportType: string
  setReportType: (v: string) => void
  date: Date
  setDate: (d: Date) => void
  selectedClass: string
  setSelectedClass: (v: string) => void
  selectedStatus: string
  setSelectedStatus: (v: string) => void
}

export default function CustomReportGenerator({
  reportType,
  setReportType,
  date,
  setDate,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
}: CustomReportGeneratorProps) {
  const { classes, submissions, students } = useAppData()
  const [calendarOpen, setCalendarOpen] = useState(false)

  const filteredStudents = students.filter(
    (s) =>
      (selectedClass === 'all' || s.class === selectedClass) &&
      (selectedStatus === 'all' || s.status === selectedStatus),
  )

  const pendingSubmissions = getPendingSubmissionStudents(
    date,
    filteredStudents,
    submissions,
  )

  const handleExport = () => {
    try {
      const data = filteredStudents.map((student) => {
        const notSubmitted = !!pendingSubmissions.find(
          (u) => u._id === student._id,
        )
        return {
          student: student.name,
          class: student.class,
          imei: student.tablet?.imei || 'N/A',
          submitted: (notSubmitted || !student.tablet) ? 'No' : 'Yes',
        }
      })
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, ws, 'SUBMISSIONS REPORT')
      XLSX.writeFile(wb, `SUBMISSIONS_REPORT_${date.toDateString()}.xlsx`)
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl mt-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Custom Report Generator
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Report Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground mb-1">
            Report Type
          </label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes
                .filter((r) => r.value && r.value.trim() !== '')
                .map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground mb-1">
            Date
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={
                  'w-full justify-start text-left font-normal' +
                  (!date ? ' text-muted-foreground' : '')
                }
              >
                {date ? dayjs(date).format('YYYY-MM-DD') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  if (d) setDate(d)
                  setCalendarOpen(false)
                }}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Class Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground mb-1">
            Class Filter
          </label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes
                .filter((c) => c.name && c.name.trim() !== '')
                .map((c) => (
                  <SelectItem key={c._id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* Status Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground mb-1">
            Status Filter
          </label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions
                .filter((s) => s.value && s.value.trim() !== '')
                .map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Actions below, right-aligned */}
      <div className="flex justify-end mt-6 gap-2 flex-wrap">
        <Button onClick={handleExport} className="flex items-center gap-2">
          <FileDown className="w-4 h-4" /> Export
        </Button>
      </div>
    </div>
  )
}
