import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { tabletStatus } from './shared/validators'

export const getAll = query({
  handler: async (ctx) => {
    const tablets = await ctx.db.query('tablets').collect()
    return tablets
  },
})

export const create = mutation({
  args: {
    imei: v.string(),
    status: tabletStatus,
    bagNumber: v.string()
  },
  handler: async (ctx, { imei, status, bagNumber }) => {
    const existingTablet = await ctx.db
      .query('tablets')
      .withIndex('by_imei', (q) => q.eq('imei', imei))
      .unique()

    if (existingTablet) throw Error('Tablet IMEI is taken')

    const newTablet = await ctx.db.insert('tablets', { imei, status, distributed: false, bagNumber })
    return newTablet
  },
})

export const update = mutation({
  args: {
    id: v.id('tablets'),
    imei: v.optional(v.string()),
    status: v.optional(tabletStatus),
    bagNumber: v.optional(v.string())
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields)
  },
})

export const remove = mutation({
  args: { id: v.id('tablets') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('tablets')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const tablets = await ctx.db.query('tablets').collect()
    await Promise.all(tablets.map(async (t) => await ctx.db.delete(t._id)))
  },
})
