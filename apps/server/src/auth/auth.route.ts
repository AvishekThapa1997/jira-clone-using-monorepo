import { Router } from "express";
import {
  getSessionHandler,
  refreshTokenHandler,
  signInHandler,
  signUpHanlder,
} from "./auth.controller.js";
import { authTokenVerificationMiddleware } from "./auth.middleware.js";
const authRoutes = Router();
authRoutes.post("/auth/sign-in", signInHandler);
authRoutes.post("/auth/sign-up", signUpHanlder);
authRoutes.get(
  "/auth/session",
  authTokenVerificationMiddleware,
  getSessionHandler
);
authRoutes.get("/auth/access-token", refreshTokenHandler);

export { authRoutes };
