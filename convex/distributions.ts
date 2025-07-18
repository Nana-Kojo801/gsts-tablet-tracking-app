import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query('distributions').collect()
  },
})

export const create = mutation({
  args: {
    entries: v.array(v.object({
      studentId: v.id('students'),
      distributedById: v.id('users'),
      distributionTime: v.float64(),
    })),
  },
  handler: async (ctx, { entries }) => {
    await Promise.all(
      entries.map(async (args) => {
        const student = (await ctx.db.get(args.studentId))!
        await ctx.db.patch(student.tabletId!, { distributed: true })

        return await ctx.db.insert('distributions', args)
      }),
    )
  },
})

export const remove = mutation({
  args: { id: v.id('distributions') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('distributions')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const distributions = await ctx.db.query('distributions').collect()
    await Promise.all(
      distributions.map(async (t) => await ctx.db.delete(t._id)),
    )
  },
})
