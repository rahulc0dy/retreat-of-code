import { configDotenv } from "dotenv";
import { defineConfig } from "drizzle-kit";

configDotenv({
  path: "./.env.local",
});

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
