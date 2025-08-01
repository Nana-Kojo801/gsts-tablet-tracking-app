import { defineTable } from "convex/server";
import { v } from "convex/values";
import { userStatus } from "../shared/validators";

export const studentTable = defineTable({
    name: v.string(),
    indexNumber: v.string(),
    programmeId: v.id("programmes"),
    classId: v.id("classes"),
    tabletId: v.optional(v.id("tablets")),
    status: userStatus
}).index("by_name", ["name"])