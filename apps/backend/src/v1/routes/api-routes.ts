import express, { type Express } from "express";
import { deserializeUser } from "../../common/middlewares";
import authRoutes from "../modules/authentication/auth.route";
import tenantPublicRoutes from "../modules/tenant/public.route";
import tenantRoutes from "../modules/tenant/route";

const router = express.Router();

const getApiRoutes = () => {
  router.use("/health", (_req, res) => {
    res.status(200).json({ message: "V1:Healthy" });
  });
  // Authenticated routes (registered after deserializeUser below)
  router.use("/tenants", tenantRoutes);
  return router;
};

export const setupApiRoutes = (app: Express): void => {
  router.use("/auth", authRoutes);
  // Public storefront endpoints — registered before deserializeUser so they stay unauthenticated.
  router.use("/storefront", tenantPublicRoutes);
  router.use(deserializeUser);
  app.use("/api/v1", getApiRoutes());
};
