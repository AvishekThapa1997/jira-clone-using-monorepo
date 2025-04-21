import express, { Router } from "express";
import "@/config/environment/index.js";
import "@/lib/db.js";
import { authRoutes } from "@/auth/auth.route.js";
import { globalErrorHandler } from "@/util/globalErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
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
  app.use("/test", (req, res) => {
    console.log({ req });
    res.status(200).json({
      message: "Server running successfully",
    });
  });
  app.use("/api", appRoutes);
  app.use(globalErrorHandler);
}
initServer();
export default app;
