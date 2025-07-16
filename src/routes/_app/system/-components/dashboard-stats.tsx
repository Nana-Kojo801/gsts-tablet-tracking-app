import { Monitor, Tablet, User, Users } from 'lucide-react'
import { classes, students, tablets, users } from '../-mock-data'

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-muted-foreground">
            Students
          </div>
          <div className="text-2xl font-bold text-foreground">
            {students.length}
          </div>
        </div>
        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-muted-foreground">
            Classes
          </div>
          <div className="text-2xl font-bold text-foreground">
            {classes.length}
          </div>
        </div>
        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-green-600" />
        </div>
      </div>
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-muted-foreground">
            Tablets
          </div>
          <div className="text-2xl font-bold text-foreground">
            {tablets.length}
          </div>
        </div>
        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
          <Tablet className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-lg flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Users</div>
          <div className="text-2xl font-bold text-foreground">
            {users.length}
          </div>
        </div>
        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
          <Monitor className="w-6 h-6 text-yellow-600" />
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
