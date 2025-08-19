import { useState, useMemo } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Search, Tablet } from 'lucide-react'
import { useCreateStudentMutation, useEditStudentMutation } from '@/mutations'
import type { Class, Programme, Student } from '@/types'
import type { Id } from '@convex/_generated/dataModel'
import { useAppData } from '@/hooks/use-app-data'

interface StudentFormProps {
  closeDialog: () => void
  type: 'add' | 'edit'
  studentObj: Student | null
}

const StudentForm = ({ closeDialog, type, studentObj }: StudentFormProps) => {
  const { classes, programmes, tablets, students } = useAppData()

  // For tablet autocomplete
  const initialTabletImei = useMemo(() => {
    if (type === 'edit' && studentObj?.tabletId) {
      const found = tablets.find((t: any) => t._id === studentObj.tabletId)
      return found ? found.imei : undefined
    }
    return undefined
  }, [type, studentObj, tablets])
  const [tabletSearch, setTabletSearch] = useState(initialTabletImei)
  const [showTabletDropdown, setShowTabletDropdown] = useState(false)
  const matchingTablets = tabletSearch
    ? tablets.filter((t: any) =>
        t.imei.toLowerCase().includes(tabletSearch.toLowerCase()),
      )
    : tablets

  const createStudent = useCreateStudentMutation()
  const editStudent = useEditStudentMutation()

  const studentSchema = z.object({
    name: z
      .string()
      .nonempty('Name is required')
      .max(100, 'Name must be less than 100 characters'),
    classId: z.string().nonempty('Class is required'),
    indexNumber: z.string().nonempty('Index number is required'),
    programmeId: z.string().nonempty('Programme is required'),
    status: z.union([z.literal('Day'), z.literal('Boarder')]),
    tabletId: z
      .string()
      .optional()
      .refine((val) => !val || tablets.some((t) => t._id === val), {
        message: 'Please select a valid tablet from the list',
      })
      .refine((val) => {
        if (!val) return true // No tablet selected is fine
        // Check if tablet is owned by a different student
        const isOwnedByDifferentStudent = students.some(
          (s) => s.tabletId === val && s._id !== studentObj?._id
        )
        return !isOwnedByDifferentStudent
      }, {
        message: 'This tablet is already assigned to another student',
      }) as z.ZodType<Id<'tablets'> | undefined>,
  })

  const form = useForm<z.infer<typeof studentSchema>>({
    defaultValues:
      type === 'edit' && studentObj
        ? {
            name: studentObj.name,
            indexNumber: studentObj.indexNumber,
            classId: studentObj.classId || '',
            programmeId: studentObj.programmeId || '',
            status: studentObj.status,
            tabletId: studentObj.tabletId || undefined,
          }
        : {
            name: '',
            indexNumber: '',
            classId: '',
            programmeId: '',
            status: 'Day',
            tabletId: undefined,
          },
    resolver: zodResolver(studentSchema),
  })

  const handleSubmit = async (values: z.infer<typeof studentSchema>) => {
    // Only send classId, programmeId, tabletId (if present), never class or programme
    const payload = { ...values }
    if (type === 'edit' && studentObj) {
      await editStudent.mutateAsync({
        id: studentObj._id,
        ...payload,
        programmeId: values.programmeId as Programme['_id'],
        classId: values.classId as Class['_id'],
      })
    } else {
      await createStudent.mutateAsync({
        ...payload,
        programmeId: values.programmeId as Programme['_id'],
        classId: values.classId as Class['_id'],
      })
    }
    closeDialog()
  }

  // On blur, if the IMEI is not in the list, clear the field
  const handleTabletBlur = (field: any) => {
    if (!tabletSearch) {
      field.onChange(undefined)
      setTabletSearch(undefined)
      setShowTabletDropdown(false)
      return
    }
    const found = tablets.find((t: any) => t.imei === tabletSearch)
    if (!found) {
      field.onChange(undefined)
      setTabletSearch(undefined)
    }
    setShowTabletDropdown(false)
  }

  // Check if form is valid and tablet is not owned by another student
  const isFormValid = form.formState.isValid
  const selectedTabletId = form.watch('tabletId')
  const isTabletOwnedByOther = selectedTabletId && students.some(
    (s) => s.tabletId === selectedTabletId && s._id !== studentObj?._id
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="student-name"
                  placeholder="Enter student name"
                  className="h-10"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="indexNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Index Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="index-number"
                  placeholder="Enter index number"
                  className="h-10"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Programme */}
        <FormField
          control={form.control}
          name="programmeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programme</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select programme" />
                  </SelectTrigger>
                  <SelectContent>
                    {programmes.map((p: any) => (
                      <SelectItem key={p._id} value={p._id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Class */}
        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c: any) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day">Day</SelectItem>
                    <SelectItem value="Boarder">Boarder</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Tablet IMEI Autocomplete */}
        <FormField
          control={form.control}
          name="tabletId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tablet IMEI</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Search className="w-4 h-4" />
                  </span>
                  <Input
                    placeholder="Type tablet IMEI"
                    value={tabletSearch ?? ''}
                    onChange={(e) => {
                      const val = e.target.value
                      setTabletSearch(val === '' ? undefined : val)
                      setShowTabletDropdown(true)
                      // Only set the value if the IMEI matches a tablet
                      const found = tablets.find((t: any) => t.imei === val)
                      if (found) {
                        field.onChange(found._id)
                      } else if (val === '') {
                        field.onChange(undefined)
                      } else {
                        field.onChange(undefined)
                      }
                    }}
                    onFocus={() => setShowTabletDropdown(true)}
                    onBlur={() => handleTabletBlur(field)}
                    autoComplete="off"
                    className="h-10 pl-9"
                  />
                  {showTabletDropdown && (
                    <div className="absolute z-20 bg-white dark:bg-muted border border-primary/20 dark:border-border rounded-lg w-full max-h-40 overflow-y-auto shadow-2xl mt-1 animate-fade-in p-1">
                      {matchingTablets.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-muted-foreground text-center select-none">
                          No tablets found
                        </div>
                      ) : (
                        matchingTablets.map((t) => {
                          const isOwnedByDifferentStudent = students.some(
                            (s) => s.tabletId === t._id && s._id !== studentObj?._id
                          )
                          return (
                            <div
                              key={t._id}
                              className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors rounded-lg text-xs mb-0.5 ${
                                field.value === t._id 
                                  ? 'bg-primary/10 font-semibold text-primary' 
                                  : isOwnedByDifferentStudent
                                    ? 'opacity-50 cursor-not-allowed bg-red-50 hover:bg-red-50'
                                    : 'hover:bg-primary/5'
                              }`}
                              onMouseDown={() => {
                                if (!isOwnedByDifferentStudent) {
                                  field.onChange(t._id)
                                  setTabletSearch(t.imei)
                                  setShowTabletDropdown(false)
                                }
                              }}
                            >
                              <Tablet className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="tracking-wider">{t.imei}</span>
                              {isOwnedByDifferentStudent && (
                                <span className="text-red-600 font-medium">(Owned by another student)</span>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-3">
          {type === 'add' && (
            <Button
              disabled={createStudent.isPending || !isFormValid || isTabletOwnedByOther}
              type="submit"
              className="h-10"
            >
              {createStudent.isPending ? 'Adding..' : 'Add Student'}
            </Button>
          )}
          {type === 'edit' && studentObj && (
            <Button
              disabled={editStudent.isPending || !isFormValid || isTabletOwnedByOther}
              type="submit"
              className="h-10"
            >
              {editStudent.isPending ? 'Editing..' : 'Edit Student'}
            </Button>
          )}
          <Button onClick={closeDialog} variant="outline" className="h-10">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default StudentForm