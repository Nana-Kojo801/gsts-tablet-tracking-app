import { defineSchema } from 'convex/server'
import { userTable } from './models/user'
import { classTable } from './models/class'
import { tabletTable } from './models/tablet'
import { programmeTable } from './models/programme'
import { studentTable } from './models/student'
import { submissionTable } from './models/submission'
import { confiscationTable } from './models/confiscation'

export default defineSchema({
  users: userTable,
  classes: classTable,
  tablets: tabletTable,
  students: studentTable,
  programmes: programmeTable,
  submissions: submissionTable,
  confiscations: confiscationTable
})
