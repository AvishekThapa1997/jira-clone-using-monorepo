import { Router } from "express";
const authRoutes = Router();
authRoutes.get("/auth/sign-in", (_req, res) => {
  res.json({
    message: "SIGN-UP",
  });
});
authRoutes.get("/auth/sign-up", (_req, res) => {
  res.json({
    message: "SIGN-UP",
  });
});

export { authRoutes };
