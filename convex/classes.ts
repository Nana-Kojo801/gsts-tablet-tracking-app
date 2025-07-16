import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  handler: async (ctx) => {
    const classes = await ctx.db.query('classes').collect()
    return classes
  },
})

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const existingClass = await ctx.db
      .query('classes')
      .withIndex('by_name', (q) => q.eq('name', name))
      .unique()

    if (existingClass) throw Error('Class name is taken')

    const newClass = await ctx.db.insert('classes', { name })
    return newClass
  },
})

export const update = mutation({
  args: { id: v.id('classes'), name: v.string() },
  handler: async (ctx, { id, name }) => {
    await ctx.db.patch(id, { name })
  },
})

export const remove = mutation({
  args: { id: v.id('classes') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('classes')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const classes = await ctx.db.query('classes').collect()
    await Promise.all(classes.map(async (c) => await ctx.db.delete(c._id)))
  },
})
