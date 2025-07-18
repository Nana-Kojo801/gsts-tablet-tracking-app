import { v } from "convex/values";

export const userRoles = v.union(v.literal("admin"), v.literal("user"));
export const tabletStatus = v.union(v.literal("active"), v.literal("lost"))
export const userStatus = v.union(v.literal("Day"), v.literal("Boarder"))
export const submissionCondition = v.union(v.literal("Good"), v.literal("Bad"), v.literal("Missing"))