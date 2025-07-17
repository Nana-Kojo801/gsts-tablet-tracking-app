import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  handler: async (ctx) => {
    const programmes = await ctx.db.query('programmes').collect()
    return programmes
  },
})

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const existingProgramme = await ctx.db
      .query('programmes')
      .withIndex('by_name', (q) => q.eq('name', name))
      .unique()

    if (existingProgramme) throw Error('Programme name is taken')

    const newProgramme = await ctx.db.insert('programmes', { name })
    return newProgramme
  },
})

export const update = mutation({
  args: { id: v.id('programmes'), name: v.string() },
  handler: async (ctx, { id, name }) => {
    await ctx.db.patch(id, { name })
  },
})

export const remove = mutation({
  args: { id: v.id('programmes') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('programmes')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const programmes = await ctx.db.query('programmes').collect()
    await Promise.all(programmes.map(async (p) => await ctx.db.delete(p._id)))
  },
}) 