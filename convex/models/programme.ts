import { defineTable } from "convex/server";
import { v } from "convex/values";

export const programmeTable = defineTable({
    name: v.string()
}).index("by_name", ["name"])