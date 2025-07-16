import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Edit,
  Eye, 
  Tablet,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
} from 'lucide-react'

export const Route = createFileRoute('/_app/students/')({
  component: StudentsManagement,
})

function StudentsManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  // Mock data for demonstration
  const students = [
    {
      id: '1',
      name: 'John Doe',
      class: '3A',
      photo: 'https://via.placeholder.com/40',
      email: 'john.doe@gsts.edu.gh',
      phone: '+233 24 123 4567',
      status: 'active',
      tabletAssigned: 'GT-2024-001',
      tabletIMEI: '123456789012345',
      lastCollection: '2024-01-15 15:30',
      collectionStatus: 'collected'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      class: '2B',
      photo: 'https://via.placeholder.com/40',
      email: 'sarah.smith@gsts.edu.gh',
      phone: '+233 24 234 5678',
      status: 'active',
      tabletAssigned: 'GT-2024-002',
      tabletIMEI: '123456789012346',
      lastCollection: '2024-01-15 15:45',
      collectionStatus: 'collected'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      class: '3A',
      photo: 'https://via.placeholder.com/40',
      email: 'michael.johnson@gsts.edu.gh',
      phone: '+233 24 345 6789',
      status: 'active',
      tabletAssigned: 'GT-2024-003',
      tabletIMEI: '123456789012347',
      lastCollection: '2024-01-15 16:00',
      collectionStatus: 'pending'
    },
    {
      id: '4',
      name: 'Emily Brown',
      class: '1C',
      photo: 'https://via.placeholder.com/40',
      email: 'emily.brown@gsts.edu.gh',
      phone: '+233 24 456 7890',
      status: 'inactive',
      tabletAssigned: null,
      tabletIMEI: null,
      lastCollection: null,
      collectionStatus: 'not_assigned'
    },
    {
      id: '5',
      name: 'David Wilson',
      class: '2B',
      photo: 'https://via.placeholder.com/40',
      email: 'david.wilson@gsts.edu.gh',
      phone: '+233 24 567 8901',
      status: 'active',
      tabletAssigned: 'GT-2024-004',
      tabletIMEI: '123456789012348',
      lastCollection: '2024-01-15 14:15',
      collectionStatus: 'collected'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'collected':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'not_assigned':
        return <AlertCircle className="w-4 h-4 text-gray-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'collected':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'not_assigned':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(students.map(s => s.id))
    }
  }

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">
            Manage robotics club students and their tablet assignments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import Students</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="1A">Class 1A</SelectItem>
              <SelectItem value="1B">Class 1B</SelectItem>
              <SelectItem value="1C">Class 1C</SelectItem>
              <SelectItem value="2A">Class 2A</SelectItem>
              <SelectItem value="2B">Class 2B</SelectItem>
              <SelectItem value="3A">Class 3A</SelectItem>
              <SelectItem value="3B">Class 3B</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="not_assigned">Not Assigned</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-blue-800">
                {selectedStudents.length} student(s) selected
              </span>
              <Button variant="outline" size="sm" onClick={handleSelectAll} className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Deselect All
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50">
                <Tablet className="w-4 h-4" />
                <span>Assign Tablets</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
                <span>Update Status</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50">
                <Download className="w-4 h-4" />
                <span>Export Selected</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b border-border/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === students.length}
                    onChange={handleSelectAll}
                    className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Student</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Class</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Tablet</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Last Collection</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Status</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {students.map((student, index) => (
                <tr key={student.id} className={`hover:bg-muted/40 transition-all duration-200 ${index % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-foreground text-sm truncate">{student.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {student.tabletAssigned ? (
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-foreground">{student.tabletAssigned}</div>
                        <div className="text-xs text-muted-foreground">IMEI: {student.tabletIMEI?.slice(-8)}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Not assigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {student.lastCollection ? (
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-foreground">
                          {new Date(student.lastCollection).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(student.lastCollection).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(student.collectionStatus)}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(student.collectionStatus)}`}>
                        {student.collectionStatus.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary">
                        <MoreHorizontal className="w-3.5 h-3.5" />
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
          Showing <span className="font-semibold text-foreground">1</span> to <span className="font-semibold text-foreground">{students.length}</span> of <span className="font-semibold text-foreground">{students.length}</span> students
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/50">
            Previous
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/50">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
