import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select'
import dayjs from 'dayjs'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

interface ChartsFilterProps {
  filterState: {
    dateRange: 'today' | '7days' | '30days' | 'custom';
    customStart: string;
    customEnd: string;
    selectedClass: string;
    selectedStatus: string;
    selectedProgramme: string;
    startOpen: boolean;
    endOpen: boolean;
  };
  setFilterState: (v: any) => void;
  classOptions: { value: string; label: string }[];
  programmeOptions: { value: string; label: string }[];
  statusOptions: { value: string; label: string }[];
}

const ChartsFilter = ({
  filterState,
  setFilterState,
  classOptions,
  programmeOptions,
  statusOptions,
}: ChartsFilterProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground mb-2">Filters</h2>
      {/* Filters row */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <Select
              value={filterState.dateRange}
              onValueChange={v => setFilterState((prev: any) => ({ ...prev, dateRange: v }))}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              value={filterState.selectedClass}
              onValueChange={v => setFilterState((prev: any) => ({ ...prev, selectedClass: v }))}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              value={filterState.selectedStatus}
              onValueChange={v => setFilterState((prev: any) => ({ ...prev, selectedStatus: v }))}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select
              value={filterState.selectedProgramme}
              onValueChange={v => setFilterState((prev: any) => ({ ...prev, selectedProgramme: v }))}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programmes</SelectItem>
                {programmeOptions.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Custom date pickers below the row */}
        {filterState.dateRange === 'custom' && (
          <div className="flex flex-col gap-4 mt-2 md:flex-row md:gap-4 w-full">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-xs text-muted-foreground mb-1">Start Date</span>
              <Popover open={filterState.startOpen} onOpenChange={v => setFilterState((prev: any) => ({ ...prev, startOpen: v }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !filterState.customStart && "text-muted-foreground")}
                  >
                    <CalendarIcon />
                    {filterState.customStart ? dayjs(filterState.customStart).format('MMM D, YYYY') : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={filterState.customStart ? new Date(filterState.customStart) : undefined}
                    onSelect={date => {
                      setFilterState((prev: any) => ({ ...prev, customStart: date ? dayjs(date).format('YYYY-MM-DD') : '', startOpen: false }))
                    }}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-xs text-muted-foreground mb-1">End Date</span>
              <Popover open={filterState.endOpen} onOpenChange={v => setFilterState((prev: any) => ({ ...prev, endOpen: v }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !filterState.customEnd && "text-muted-foreground")}
                  >
                    <CalendarIcon />
                    {filterState.customEnd ? dayjs(filterState.customEnd).format('MMM D, YYYY') : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={filterState.customEnd ? new Date(filterState.customEnd) : undefined}
                    onSelect={date => {
                      setFilterState((prev: any) => ({ ...prev, customEnd: date ? dayjs(date).format('YYYY-MM-DD') : '', endOpen: false }))
                    }}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartsFilter
