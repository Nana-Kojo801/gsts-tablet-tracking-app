import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { userRoles, userStatus } from './shared/validators'
import { generateUserPassword, getUserByUsername } from './models/users/helpers'

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect()
  }
})

export const get = query({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  }
})

export const getByUsername = query({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    return getUserByUsername(ctx, name)
  }
})

export const create = mutation({
  args: { name: v.string(), role: userRoles },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('users', {
      ...args,
      password: generateUserPassword(),
    })
    return (await ctx.db.get(id))!
  },
})

export const update = mutation({
  args: {
    id: v.id('users'),
    name: v.optional(v.string()),
    role: v.optional(userRoles),
    password: v.optional(v.string())
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields)
  },
})

export const remove = mutation({
  args: { id: v.id('users') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
