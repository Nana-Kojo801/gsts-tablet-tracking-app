import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAllSubmissionProps } from './models/submissions/helpers'
import { submissionCondition } from './shared/validators'

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query('submissions').collect()
  },
})

export const create = mutation({
  args: {
    entries: v.array(
      v.object({
        studentId: v.id('students'),
        receivedById: v.id('users'),
        condition: submissionCondition,
        submissionTime: v.float64(),
      }),
    ),
  },
  handler: async (ctx, { entries }) => {
    await Promise.all(
      entries.map(async (args) => {
        const student = (await ctx.db.get(args.studentId))!
        if (args.condition === 'Missing')
          await ctx.db.patch(student.tabletId!, { status: 'lost' })
        else await ctx.db.patch(student.tabletId!, { distributed: false })
        await ctx.db.insert("submissions", args)
      }),
    )
  },
})

export const remove = mutation({
  args: { id: v.id('submissions') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

export const bulkRemove = mutation({
  args: { ids: v.array(v.id('submissions')) },
  handler: async (ctx, { ids }) => {
    await Promise.all(ids.map(async (id) => await ctx.db.delete(id)))
  },
})

export const removeAll = mutation({
  handler: async (ctx) => {
    const submissions = await ctx.db.query('submissions').collect()
    await Promise.all(submissions.map(async (t) => await ctx.db.delete(t._id)))
  },
})
