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
import * as XLSX from 'xlsx'
import { useImportStudentsMutation } from '@/mutations'
import Spinner from '@/components/spinner'

export function DataManagementSettings() {
  const user = useUser()
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
            'Student Name',
            'Programme',
            'Status',
            'Class',
            'Bag Number',
            'IMEI Number',
          ]
          const missing = requiredFields.filter((field) => !(field in row))
          if (missing.length > 0) {
            console.error(
              `Row ${idx + 2} is missing required columns: ${missing.join(', ')}`,
            )
            return null
          }
          let status = row['Status'] === 'Boarding' ? 'Boarder' : row['Status']
          status = status === 'Day' || status === 'Boarder' ? status : 'Day'
          return {
            name: row['Student Name'],
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
  const showImportDiv = isParsing || importStudents.isPending
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Data Management
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-start flex-1">
            <Button variant="outline" className="flex items-center space-x-2" disabled>
              <Download className="w-4 h-4" />
              <span>Back up Data</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-1 ml-1 break-words max-w-full">
              <span className="text-orange-500 font-medium">⚠️ Feature not implemented yet</span><br />
              Exports all app data as a <b>JSON</b> file. The exported file will
              contain objects for <code>students</code>, <code>tablets</code>,{' '}
              <code>submissions</code>, <code>classes</code>, and <code>programmes</code>.<br />
              <span className="text-muted-foreground">Example:</span>
              <pre className="bg-muted/40 rounded p-2 mt-1 overflow-x-auto text-xs whitespace-pre-wrap break-words max-w-full">
                {'{'}
                "students": [...], "tablets": [...], "submissions": [...],
                "classes": [...], "programmes": [...]
                {'}'}
              </pre>
            </p>
          </div>
          {user.role === 'admin' && (
            <>
              <div className="flex flex-col items-start flex-1">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                  disabled
                >
                  <Download className="w-4 h-4" />
                  <span>Restore back up</span>
                </Button>
                <p className="text-xs text-muted-foreground mt-1 ml-1 break-words max-w-full">
                  <span className="text-orange-500 font-medium">⚠️ Feature not implemented yet</span><br />
                  Imports all app data exported as a <b>JSON</b> file. The exported file
                  will contain objects for <code>students</code>,{' '}
                  <code>tablets</code>, <code>submissions</code>,{' '}
                  <code>classes</code>, and <code>programmes</code>.<br />
                  <span className="text-muted-foreground">Example:</span>
                  <pre className="bg-muted/40 rounded p-2 mt-1 overflow-x-auto text-xs whitespace-pre-wrap break-words max-w-full">
                    {'{'}
                    "students": [...], "tablets": [...], "submissions": [...],
                    "classes": [...], "programmes": [...]
                    {'}'}
                  </pre>
                </p>
              </div>
              <div className="flex flex-col items-start flex-1">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                  onClick={onMasterImport}
                  disabled={showImportDiv}
                >
                  <Upload className="w-4 h-4" />
                  <span>Master Import</span>
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
                {showImportDiv && (
                  <div className="mt-2 flex items-center gap-2 bg-muted/70 border border-border rounded px-2 py-1 shadow-sm">
                    <Spinner className="w-4 h-4 text-primary animate-spin" />
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        Importing students...
                      </div>
                      <div className="text-xs text-muted-foreground">
                        This may take a few moments.
                      </div>
                    </div>
                  </div>
                )}
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
