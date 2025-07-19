import { defineSchema } from 'convex/server'
import { userTable } from './models/users/usersTable'
import { classTable } from './models/classes/classTable'
import { tabletTable } from './models/tablets/tabletTable'
import { programmeTable } from './models/programmes/programmeTable'
import { studentTable } from './models/students/studentTable'
import { submissionTable } from './models/submissions/submissionTable'

export default defineSchema({
  users: userTable,
  classes: classTable,
  tablets: tabletTable,
  students: studentTable,
  programmes: programmeTable,
  submissions: submissionTable
})
