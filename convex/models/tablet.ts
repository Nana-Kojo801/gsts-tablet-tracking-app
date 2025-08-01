import { defineTable } from "convex/server";
import { v } from "convex/values";
import { tabletStatus } from "../shared/validators";

export const tabletTable = defineTable({
    imei: v.string(),
    bagNumber: v.string(),
    status: tabletStatus,
}).index("by_imei", ["imei"])