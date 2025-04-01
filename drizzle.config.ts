import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "@/env/server";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
