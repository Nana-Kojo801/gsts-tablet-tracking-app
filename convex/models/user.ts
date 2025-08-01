import { defineTable } from "convex/server";
import { v } from "convex/values";
import { userRoles } from "../shared/validators";
import { type QueryCtx } from '../_generated/server'


export const userTable = defineTable({
    name: v.string(),
    role: userRoles,
    password: v.string()
}).index("by_name", ["name"])


export const generateUserPassword = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(
    '',
  )
}

export const getUserByUsername = async (ctx: QueryCtx, username: string) => {
  return await ctx.db
    .query('users')
    .withIndex('by_name', (q) => q.eq('name', username))
    .unique()
}