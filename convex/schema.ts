import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema
({
  
  themes: defineTable
  ({
    userId: v.string(),
    name: v.string(),
    value: v.string(),
    iconName: v.string(),
  }),

  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
    userId: v.string(),
  }),

})
