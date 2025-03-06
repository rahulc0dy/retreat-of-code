import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "@/db/schemas/users";
import { sql } from "drizzle-orm";

export const accounts = pgTable("account", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});
