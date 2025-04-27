import express, { Router } from "express";
import "@/config/environment/index.js";
import "@/lib/db.js";
import { authRoutes } from "@/auth/auth.route.js";
import { globalErrorHandler } from "@/util/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { serverHealtCheckHandler } from "./util/serverHealthCheckHandler.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});
export async function initServer() {
  const appRoutes = Router();
  appRoutes.use(authRoutes);
  app.use("/api", appRoutes);
  app.use(serverHealtCheckHandler);
  app.use(globalErrorHandler);
}
initServer();
export default app;
