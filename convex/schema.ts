import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { userTable } from './models/users/usersTable'
import { classTable } from './models/classes/classTable'
import { tabletTable } from './models/tablets/tabletTable'
import { programmeTable } from './models/programmes/programmeTable'
import { studentTable } from './models/students/studentTable'
import { submissionTable } from './models/submissions/submissionTable'
import { distributionTable } from './models/distributions/distributionTable'

export default defineSchema({
  users: userTable,
  classes: classTable,
  tablets: tabletTable,
  students: studentTable,
  programmes: programmeTable,
  submissions: submissionTable,
  distributions: distributionTable
})
