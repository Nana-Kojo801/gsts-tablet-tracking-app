import { mutation } from "./_generated/server";

export const clearAll = mutation({
  handler: async (ctx) => {
    // List all tables to clear
    const tables = [
      "students",
      "tablets",
      "submissions",
      "distributions",
      "classes",
      "programmes",
    ] as const;

    // For each table, fetch all documents and delete them
    await Promise.all(
      tables.map(async (table) => {
        const docs = await ctx.db.query(table).collect();
        await Promise.all(
          docs.map((doc) => ctx.db.delete(doc._id))
        );
      })
    );
  },
});