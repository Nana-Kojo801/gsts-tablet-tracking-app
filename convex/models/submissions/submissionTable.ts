import { defineTable } from "convex/server";
import { v } from "convex/values";
import { submissionCondition } from "../../shared/validators";

export const submissionTable = defineTable({
    studentId: v.id("students"),
    receivedById: v.id("users"),
    condition: submissionCondition,
    submissionTime: v.float64()
})