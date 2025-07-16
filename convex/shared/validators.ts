import { v } from "convex/values";

export const userRoles = v.union(v.literal("admin"), v.literal("user"));