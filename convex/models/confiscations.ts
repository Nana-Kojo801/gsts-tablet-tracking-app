import { defineTable } from "convex/server";
import { v } from "convex/values";
import { confiscationStatus } from "../shared/validators";

export const confiscationTable = defineTable({
    studentId: v.id("students"),
    reason: v.string(),
    confiscationTime: v.float64(),
    status: confiscationStatus
})