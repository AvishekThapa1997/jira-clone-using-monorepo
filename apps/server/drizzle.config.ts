import { defineConfig } from "drizzle-kit";

const isDevEnvironment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema",
  out: "./src/config/db/migrations",
  ...(isDevEnvironment
    ? {
        dbCredentials: {
          url: process.env.DATABASE_URL,
        },
      }
    : {}),
});

process.env.NODE_ENV;
