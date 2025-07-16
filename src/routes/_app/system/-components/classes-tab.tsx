import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Plus, Upload, Eye, Edit, Trash2, Search } from 'lucide-react'
import { classes } from '../-mock-data'
import { useQuery } from '@tanstack/react-query'
import { fetchClassesQueryOptions } from '../-queries'

// const ClassesTableSkeleton = () => {
//   return (
//     <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[500px]">
//           <thead>
//             <tr className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b border-border/50">
//               <th className="px-4 py-3 text-left">
//                 <div className="w-4 h-4 rounded bg-muted/30 animate-pulse" />
//               </th>
//               <th className="px-4 py-3 text-left">
//                 <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Class Name</span>
//               </th>
//               <th className="px-4 py-3 text-left">
//                 <span className="font-semibold text-foreground text-sm uppercase tracking-wide">No. of Students</span>
//               </th>
//               <th className="px-4 py-3 text-left">
//                 <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Actions</span>
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border/30">
//             {[...Array(5)].map((_, i) => (
//               <tr key={i} className={`hover:bg-muted/40 transition-all duration-200 ${i % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}>
//                 <td className="px-4 py-3">
//                   <div className="w-4 h-4 rounded bg-muted/30 animate-pulse" />
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="h-4 w-32 rounded bg-muted/30 animate-pulse" />
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="h-4 w-16 rounded bg-muted/30 animate-pulse" />
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="flex items-center space-x-1">
//                     <div className="h-7 w-7 rounded bg-muted/30 animate-pulse" />
//                     <div className="h-7 w-7 rounded bg-muted/30 animate-pulse" />
//                     <div className="h-7 w-7 rounded bg-muted/30 animate-pulse" />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

const ClassesTab = () => {
  const { data: classes1, isLoading: isLoadingClasses } = useQuery(
    fetchClassesQueryOptions(),
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])

  // Filtered data (search only)
  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Bulk actions
  const classBulkActions = (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-semibold text-blue-800">
          {selectedClasses.length} class(es) selected
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedClasses([])}
          className="border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          Deselect All
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <Download className="w-4 h-4" />
          <span>Export Selected</span>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-3 items-center">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
          </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedClasses.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          {classBulkActions}
        </div>
      )}

      {/* Classes Table */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b border-border/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedClasses.length === filteredClasses.length &&
                      filteredClasses.length > 0
                    }
                    onChange={() =>
                      setSelectedClasses(
                        selectedClasses.length === filteredClasses.length
                          ? []
                          : filteredClasses.map((c) => c.id),
                      )
                    }
                    className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Class Name</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">No. of Students</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredClasses.map((classItem, index) => (
                <tr
                  key={classItem.id}
                  className={`hover:bg-muted/40 transition-all duration-200 ${index % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes(classItem.id)}
                      onChange={() =>
                        setSelectedClasses((sel) =>
                          sel.includes(classItem.id)
                            ? sel.filter((cid) => cid !== classItem.id)
                            : [...sel, classItem.id],
                        )
                      }
                      className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground text-sm">
                    {classItem.name}
                  </td>
                  <td className="px-4 py-3">{('students' in classItem) ? classItem.students : '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1</span> to{' '}
          <span className="font-semibold text-foreground">
            {filteredClasses.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-foreground">
            {filteredClasses.length}
          </span>{' '}
          classes
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 hover:bg-muted/50"
          >
            Previous
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 hover:bg-muted/50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClassesTab
