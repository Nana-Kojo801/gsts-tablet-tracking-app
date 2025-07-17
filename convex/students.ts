import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { userStatus } from './shared/validators'
import { getAllStudentProps } from './models/students/helpers'

export const getAll = query({
  handler: async (ctx) => {
    const students = await ctx.db.query('students').collect()
    return await getAllStudentProps(ctx, students)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    programmeId: v.id('programmes'),
    classId: v.id('classes'),
    tabletId: v.optional(v.id('tablets')),
    bagNumber: v.optional(v.string()),
    status: userStatus
  },
  handler: async (ctx, args) => {
    const newStudent = await ctx.db.insert('students', args)
    return newStudent
  },
})

export const update = mutation({
  args: {
    id: v.id('students'),
    name: v.optional(v.string()),
    programmeId: v.optional(v.id('programmes')),
    classId: v.optional(v.id('classes')),
    tabletId: v.optional(v.id('tablets')),
    bagNumber: v.optional(v.string()),
    status: v.optional(userStatus),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields)
  },
})

export const remove = mutation({
  args: { id: v.id('students') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('students')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const students = await ctx.db.query('students').collect()
    await Promise.all(students.map(async (s) => await ctx.db.delete(s._id)))
  },
}) 