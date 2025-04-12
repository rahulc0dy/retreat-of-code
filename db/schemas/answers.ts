import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "@/db/schemas/users";

export const answers = pgTable(
  "answer",
  {
    id: uuid("id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    questionId: uuid("question_id").notNull(),
    answer: text("answer").notNull(),
  },
  (table) => [unique().on(table.userId, table.questionId)]
);
