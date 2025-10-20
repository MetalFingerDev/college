import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get tasks for the current user only
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

// Add a new task for the current user
export const create = mutation({
  args: { 
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
      userId: identity.subject, // Store user ID with each task
    });
  },
});

// Toggle task completion
export const toggle = mutation({
  args: { 
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or not owned by user");
    }

    return await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    });
  },
});


export const deleteTask = mutation({
  args: { 
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or not owned by user");
    }

    return await ctx.db.delete(args.id);
  },
});
