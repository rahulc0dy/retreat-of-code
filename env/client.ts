import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { configDotenv } from "dotenv";

configDotenv({
  path: "./.env.local",
});

export const { NEXT_PUBLIC_API_BASE_URL } = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  emptyStringAsUndefined: true,
});
