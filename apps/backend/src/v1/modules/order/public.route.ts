import express, { type Router } from "express";
import { handleController } from "../../../common/helper";
import { validate } from "../../../common/middlewares";
import { slugParamsSchema } from "../tenant/validation";
import { createPublicByTenantSlug } from "./controller";
import { createPublicOrderBodySchema } from "./validation";

const router: Router = express.Router();

const validateParams = validate("params");
const validateBody = validate("body");

// Public storefront endpoint — place an order for a tenant, by slug (no auth).
router.post(
  "/tenants/:slug/orders",
  validateParams(slugParamsSchema),
  validateBody(createPublicOrderBodySchema),
  handleController(createPublicByTenantSlug),
);

export default router;
