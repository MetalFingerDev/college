import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getUserThemes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("themes")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const createTheme = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    value: v.string(),
    iconName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("themes", args);
  },
});