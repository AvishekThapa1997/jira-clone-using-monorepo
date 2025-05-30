import express, { Router } from "express";
import "@/config/environment/index.js";
import "@/lib/db.js";
import { authRoutes } from "@/auth/auth.route.js";
import { globalErrorHandler } from "@/util/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import { serverHealtCheckHandler } from "./util/serverHealthCheckHandler.js";
import { pool } from "@/lib/db.js";
import { notFoundHandler } from "./util/notFoundHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  pool.end();
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  pool.end();
  process.exit(1);
});

export async function initServer() {
  const appRoutes = Router();
  appRoutes.use(authRoutes);
  app.use("/api", appRoutes);
  app.get("/", serverHealtCheckHandler);
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
}
initServer();
export default app;
