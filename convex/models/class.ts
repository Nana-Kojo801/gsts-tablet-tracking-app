import { defineTable } from "convex/server";
import { v } from "convex/values";

export const classTable = defineTable({
    name: v.string()
}).index("by_name", ["name"])