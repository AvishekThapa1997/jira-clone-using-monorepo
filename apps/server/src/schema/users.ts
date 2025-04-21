import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonProps } from "./schema.helpers.js";

export const users = pgTable("users", {
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 256 }).notNull().unique(),
  password: varchar({ length: 256 }).notNull(),
  passwordSalt: varchar({ length: 256 }).notNull(),
  ...commonProps,
});
export type User = typeof users.$inferSelect;
