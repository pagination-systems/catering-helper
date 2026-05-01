import express, { type Express } from "express";
import { deserializeUser } from "../../common/middlewares";
import authRoutes from "../modules/authentication/auth.route";

const router = express.Router();

const getApiRoutes = () => {
  router.use("/health", (_req, res) => {
    res.status(200).json({ message: "V1:Healthy" });
  });
  return router;
};

export const setupApiRoutes = (app: Express): void => {
  router.use("/auth", authRoutes);
  router.use(deserializeUser);
  app.use("/api/v1", getApiRoutes());
};
