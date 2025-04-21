import { AppConfig } from "@/types/index.js";
import { config } from "dotenv";
import path from "path";
const appConfig: Partial<AppConfig> = {};
const environment = process.env.NODE_ENV !== "production" ? ".development" : "";
config({
  path: path.join(process.cwd(), `.env${environment}`),
  processEnv: appConfig,
});
export { appConfig };
