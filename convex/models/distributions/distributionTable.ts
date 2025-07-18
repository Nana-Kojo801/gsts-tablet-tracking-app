import { defineTable } from "convex/server";
import { v } from "convex/values";

export const distributionTable = defineTable({
    studentId: v.id("students"),
    distributedById: v.id("users"),
    distributionTime: v.float64()
})