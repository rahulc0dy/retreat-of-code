import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { configDotenv } from "dotenv";

configDotenv({
  path: "./.env.local",
});

export const {
  DATABASE_URL,
  AUTH_GOOGLE_CLIENT_SECRET,
  AUTH_GOOGLE_CLIENT_ID,
} = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_CLIENT_ID: z.string(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
