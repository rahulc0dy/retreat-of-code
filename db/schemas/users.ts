import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  stars: integer("stars").notNull().default(0),
});
