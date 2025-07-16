import { defineTable } from "convex/server";
import { v } from "convex/values";
import { userRoles } from "../../shared/validators";

export const userTable = defineTable({
    name: v.string(),
    role: userRoles,
    password: v.string()
}).index("by_name", ["name"])