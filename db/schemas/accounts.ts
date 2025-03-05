import { pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "@/db/schemas/users";
import { sql } from "drizzle-orm";

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: timestamp("expires_at", { withTimezone: true }),
  },
  (table) => [unique().on(table.provider, table.providerAccountId)]
);
