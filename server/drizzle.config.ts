import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: "./src/infra/db/schemas/*",
  out: "./src/infra/db/migrations",
} satisfies Config;
