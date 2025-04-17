import express, { Router } from "express";
import { authRoutes } from "./auth/auth.route";
import "./config/app.config";
const app = express();
export async function initServer() {
  const appRoutes = Router();
  appRoutes.use(authRoutes);
  app.use("/api", appRoutes);
}
initServer();
export default app;
