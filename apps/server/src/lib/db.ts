import { appConfig } from "@/config/environment/index.js";
import { drizzle } from "drizzle-orm/node-postgres";
const db = drizzle(appConfig.DATABASE_URL!);
export { db };
