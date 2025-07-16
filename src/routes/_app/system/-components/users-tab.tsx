import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Plus, Upload, Eye, Edit, Trash2, Search, Filter } from 'lucide-react'
import { users } from '../-mock-data'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const UsersTab = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Filtered data (search + role)
  const filteredUsers = users.filter(u =>
    (selectedRole === 'all' || u.role === selectedRole) &&
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Bulk actions
  const userBulkActions = (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-semibold text-blue-800">{selectedUsers.length} user(s) selected</span>
        <Button variant="outline" size="sm" onClick={() => setSelectedUsers([])} className="border-blue-300 text-blue-700 hover:bg-blue-50">Deselect All</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50"><Download className="w-4 h-4" /><span>Export Selected</span></Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search, Role Filter, and Actions */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 gap-3 items-center">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="min-w-[120px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
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
      {selectedUsers.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          {userBulkActions}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b border-border/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={() => setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map(u => u.id))}
                    className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Name</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Role</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="font-semibold text-foreground text-sm uppercase tracking-wide">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className={`hover:bg-muted/40 transition-all duration-200 ${index % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => setSelectedUsers(sel => sel.includes(user.id) ? sel.filter(uid => uid !== user.id) : [...sel, user.id])}
                      className="rounded border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground text-sm">{user.name}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button>
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
          Showing <span className="font-semibold text-foreground">1</span> to <span className="font-semibold text-foreground">{filteredUsers.length}</span> of <span className="font-semibold text-foreground">{filteredUsers.length}</span> users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/50">Previous</Button>
          <Button size="sm" className="bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/50">Next</Button>
        </div>
      </div>
    </div>
  )
}

export default UsersTab
