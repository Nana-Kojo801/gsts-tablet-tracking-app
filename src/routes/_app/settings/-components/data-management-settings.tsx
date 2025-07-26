import { Button } from '@/components/ui/button'
import { useClearAllDataMutation } from '@/mutations'
import { Upload, Trash2, Download } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, useRef } from 'react'
import { useUser } from '@/hooks/user-user'
import { useImportStudentsMutation } from '@/mutations'
import { useAppData } from '@/hooks/use-app-data'
import * as XLSX from 'xlsx'
import { toast } from 'sonner'

export function DataManagementSettings() {
  const user = useUser()
  const { students } = useAppData()
  const clearAllData = useClearAllDataMutation()
  const [dialogOpen, setDialogOpen] = useState(false)

  // Master Import logic
  const importStudents = useImportStudentsMutation()
  const [isParsing, setIsParsing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onMasterImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsParsing(true)
    const reader = new FileReader()
    reader.onload = (evt) => {
      const data = evt.target?.result
      if (!data) {
        setIsParsing(false)
        return
      }
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const studentsData = (
        XLSX.utils.sheet_to_json(sheet, { defval: '' }) as any[]
      )
        .map((row, idx) => {
          // Validation: all required fields must exist
          const requiredFields = [
            'Index No',
            'Student Name',
            'Programme',
            'Status',
            'Class',
            'Bag Number',
            'IMEI Number',
          ]
          const missing = requiredFields.filter((field) => !(field in row))
          if (missing.length > 0) {
            toast.error(
              `Row ${idx + 2} is missing required columns: ${missing.join(', ')}`,
            )
            return null
          }

          let status = row['Status'] === 'Boarding' ? 'Boarder' : row['Status']
          status = status === 'Day' || status === 'Boarder' ? status : 'Day'

          return {
            name: row['Student Name'],
            indexNumber: String(row['Index No']),
            programme: row['Programme'],
            status,
            class: row['Class'],
            bagNumber: row['Bag Number'],
            imei: row['IMEI Number'],
          }
        })
        .filter((row) => row !== null)
      setIsParsing(false)
      importStudents.mutate({ data: studentsData })
    }
    reader.readAsArrayBuffer(file)
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  const handleExportData = () => {
    const data = students.map((s) => ({
      'Student Name': s.name,
      'Index No': s.indexNumber,
      Programme: s.programme,
      Status: s.status,
      Class: s.class,
      'Bag Number': s.tablet ? s.tablet.bagNumber : '',
      'IMEI Number': s.tablet ? s.tablet.imei : '',
    }))
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data, {
      header: [
        'Student Name',
        'Index No',
        'Programme',
        'Status',
        'Class',
        'Bag Number',
        'IMEI Number',
      ],
    })
    XLSX.utils.book_append_sheet(wb, ws, `MASTER DATA`)
    XLSX.writeFile(wb, `BACKUP-${crypto.randomUUID()}}.xlsx`)
  }

  const importingData = isParsing || importStudents.isPending
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Data Management
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-start flex-1">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4" />
              <span>Back up Data</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1 break-words max-w-full">
              Exports all app data as a <b>Excel</b> file. The file will have
              columns: <b>Student Name</b>, <b>Programme</b>, <b>Status</b> (
              <code>Day</code> or <code>Boarder</code>), <b>Class</b>,{' '}
              <b>Bag Number</b>, <b>IMEI Number</b>.
            </p>
          </div>
          {user.role === 'admin' && (
            <>
              <div className="flex flex-col items-start flex-1">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                  onClick={onMasterImport}
                  disabled={importingData}
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {importingData ? 'Importing data...' : 'Import Data'}
                  </span>
                </Button>
                <p className="text-xs text-muted-foreground mt-1 ml-1 break-words max-w-full">
                  Import a master Excel (.xlsx) file of students. This will
                  automatically create any missing <b>programmes</b>,{' '}
                  <b>classes</b>, and <b>tablets</b> referenced in the file, and
                  link students to them. The file must have columns:{' '}
                  <b>Student Name</b>, <b>Programme</b>, <b>Status</b> (
                  <code>Day</code> or <code>Boarder</code>), <b>Class</b>,{' '}
                  <b>Bag Number</b>, <b>IMEI Number</b>.
                </p>
                <input
                  type="file"
                  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col items-start flex-1">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                      onClick={() => setDialogOpen(true)}
                      disabled={clearAllData.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear All Data</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Clear All Data</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to clear <b>all</b> data? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="grid grid-cols-2 gap-2">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={async () => {
                          await clearAllData.mutateAsync({})
                          setDialogOpen(false)
                        }}
                        disabled={clearAllData.isPending}
                      >
                        {clearAllData.isPending
                          ? 'Clearing...'
                          : 'Yes, Clear All'}
                      </Button>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
