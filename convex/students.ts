import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { userStatus } from './shared/validators'

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query('students').collect()
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    indexNumber: v.string(),
    programmeId: v.id('programmes'),
    classId: v.id('classes'),
    tabletId: v.optional(v.id('tablets')),
    status: userStatus,
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

export const importAll = mutation({
  args: {
    data: v.array(
      v.object({
        name: v.string(),
        indexNumber: v.string(),
        programme: v.string(),
        status: v.string(),
        class: v.string(),
        bagNumber: v.string(),
        imei: v.string(),
      }),
    ),
  },
  handler: async (ctx, { data }) => {
    // Local caches to avoid duplicate queries/inserts
    const programmeCache = new Map()
    const classCache = new Map()
    const tabletCache = new Map()

    for (const row of data) {
      // --- Programme ---
      let programme = programmeCache.get(row.programme)
      if (!programme) {
        programme = await ctx.db
          .query('programmes')
          .withIndex('by_name', (q) => q.eq('name', row.programme))
          .first()
        if (!programme) {
          const programmeId = await ctx.db.insert('programmes', {
            name: row.programme,
          })
          programme = { _id: programmeId, name: row.programme }
        }
        programmeCache.set(row.programme, programme)
      }

      // --- Class ---
      let classDoc = classCache.get(row.class)
      if (!classDoc) {
        classDoc = await ctx.db
          .query('classes')
          .withIndex('by_name', (q) => q.eq('name', row.class))
          .first()
        if (!classDoc) {
          const classId = await ctx.db.insert('classes', {
            name: row.class === '' ? 'Unassigned' : row.class,
          })
          classDoc = { _id: classId, name: row.class === '' ? 'Unassigned' : row.class }
        }
        classCache.set(row.class, classDoc)
      }

      // --- Tablet (optional) ---
      let tablet
      if (row.imei) {
        tablet = tabletCache.get(row.imei)
        if (!tablet) {
          tablet = await ctx.db
            .query('tablets')
            .withIndex('by_imei', (q) => q.eq('imei', row.imei))
            .first()
          if (!tablet) {
            const tabletId = await ctx.db.insert('tablets', {
              imei: row.imei,
              bagNumber: row.bagNumber,
              status: 'active',
            })
            tablet = { _id: tabletId, imei: row.imei }
          }
          tabletCache.set(row.imei, tablet)
        }
      }

      // --- Student ---
      await ctx.db.insert('students', {
        name: row.name,
        programmeId: programme._id,
        indexNumber: '',
        classId: classDoc._id,
        tabletId: tablet?._id,
        status: row.status as 'Day' | 'Boarder',
      })
    }
  },
})
