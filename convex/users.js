"use server"
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation: Create a user if not already present
export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // If user doesn't exist, insert new one
    if (user.length === 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
      });
      console.log("New user created:", result);
    } else {
      console.log("User already exists:", user[0]);
    }
  },
});

// Query: Get user by email
export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return user[0];
  },
});