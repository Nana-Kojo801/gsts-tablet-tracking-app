import { defineTable } from "convex/server";
import { v } from "convex/values";
import { userStatus } from "../../shared/validators";

export const studentTable = defineTable({
    name: v.string(),
    programmeId: v.id("programmes"),
    classId: v.id("classes"),
    tabletId: v.optional(v.id("tablets")),
    bagNumber: v.optional(v.string()),
    status: userStatus
}).index("by_name", ["name"])