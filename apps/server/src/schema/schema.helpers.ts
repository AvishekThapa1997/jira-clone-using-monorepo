import { timestamp, uuid } from "drizzle-orm/pg-core";

export const commonProps = {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().defaultNow().notNull(),
  updateAt: timestamp(),
};
