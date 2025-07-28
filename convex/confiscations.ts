import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { confiscationStatus } from './shared/validators'

export const getAll = query({
  handler: async (ctx) => {
    const confiscations = await ctx.db.query('confiscations').collect()
    return confiscations
  },
})

export const create = mutation({
  args: {
    studentId: v.id('students'),
    reason: v.string(),
    confiscationTime: v.float64(),
  },
  handler: async (ctx, args) => {
    const newConfiscation = await ctx.db.insert('confiscations', {
      ...args,
      status: 'confiscated',
    })
    return newConfiscation
  },
})

export const update = mutation({
  args: {
    id: v.id('confiscations'),
    studentId: v.optional(v.id('students')),
    reason: v.optional(v.string()),
    status: v.optional(confiscationStatus),
    confiscatedTime: v.optional(v.float64()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields)
  },
})

export const returnDevice = mutation({
  args: {
    studentId: v.id('students'),
    confiscationId: v.id('confiscations'),
  },
  handler: async (ctx, { studentId, confiscationId }) => {
    const student = (await ctx.db.get(studentId))!
    await Promise.all([
      ctx.db.patch(student.tabletId!, { status: 'active' }),
      ctx.db.patch(confiscationId, { status: 'returned' }),
    ])
  },
})

export const remove = mutation({
  args: { id: v.id('confiscations') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('confiscations')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const confiscations = await ctx.db.query('confiscations').collect()
    await Promise.all(
      confiscations.map(async (t) => await ctx.db.delete(t._id)),
    )
  },
})
