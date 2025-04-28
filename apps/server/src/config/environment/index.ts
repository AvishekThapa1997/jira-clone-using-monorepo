import { type AppConfig } from "@/types/index.js";
import { config } from "dotenv";
import path from "path";
import zod from "zod";
const appSchema = zod.object({
  PORT: zod.string(),
  NODE_ENV: zod.string(),
  DATABASE_URL: zod.string(),
  UPSTASH_REDIS_URL: zod.string(),
  UPSTASH_REDIS_TOKEN: zod.string(),
  TOKEN_SECRET: zod.string(),
});
const environment = process.env.NODE_ENV !== "production" ? ".development" : "";
config({
  path: path.join(process.cwd(), `.env${environment}`),
});
const parsedAppConfig = appSchema.safeParse(process.env);
if (!parsedAppConfig.success) {
  console.error("Error : " + parsedAppConfig.error);
  process.exit(1);
}
const parsedResult = parsedAppConfig.data as AppConfig;
export { parsedResult as appConfig };
