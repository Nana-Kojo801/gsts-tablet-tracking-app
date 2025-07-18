import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Users, Tablet, Monitor, User } from 'lucide-react'
import DashboardStats from './-components/dashboard-stats'
import ClassesTab from './-components/classes/classes-tab'
import StudentsTab from './-components/students/students-tab'
import TabletsTab from './-components/tablets/tablets-tab'
import UsersTab from './-components/users/users-tab'
import ProgrammesTab from './-components/programmes/programmes-tab'

export const Route = createFileRoute('/_app/system/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [tab, setTab] = useState('students')
  return (
    <div className="animate-in fade-in-20 slide-in-from-bottom-8 duration-500 space-y-6 sm:space-y-8 p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            System Management
          </h1>
          <p className="text-muted-foreground">
            Manage students, classes, tablets, and users
          </p>
        </div>
      </div>
      {/* Dashboard Stats */}
      <DashboardStats />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full flex gap-2 mb-4 h-10 overflow-x-auto scrollbar-thin scrollbar-thumb-muted/60 scrollbar-track-transparent">
          <TabsTrigger
            value="students"
            className="flex-1 min-w-[120px] flex items-center gap-2"
          >
            <Users className="w-4 h-4" /> Students
          </TabsTrigger>
          <TabsTrigger
            value="classes"
            className="flex-1 min-w-[120px] flex items-center gap-2"
          >
            <User className="w-4 h-4" /> Classes
          </TabsTrigger>
          <TabsTrigger
            value="tablets"
            className="flex-1 min-w-[120px] flex items-center gap-2"
          >
            <Tablet className="w-4 h-4" /> Tablets
          </TabsTrigger>
          <TabsTrigger
            value="programmes"
            className="flex-1 min-w-[120px] flex items-center gap-2"
          >
            <Monitor className="w-4 h-4" /> Programmes
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1 min-w-[120px] flex items-center gap-2">
            <Monitor className="w-4 h-4" /> Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentsTab />
        </TabsContent>

        <TabsContent value="classes">
          <ClassesTab />
        </TabsContent>

        <TabsContent value="tablets">
          <TabletsTab />
        </TabsContent>

        <TabsContent value="programmes">
          <ProgrammesTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
