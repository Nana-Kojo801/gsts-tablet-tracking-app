import { defineTable } from "convex/server";
import { v } from "convex/values";

export const submissionTable = defineTable({
    studentId: v.id("students"),
    receivedById: v.id("users"),
    submissionTime: v.float64()
})