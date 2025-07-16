import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { userTable } from './models/users/usersTable'
import { classTable } from './models/classes/classTable'

export default defineSchema({
  users: userTable,
  classes: classTable
})
