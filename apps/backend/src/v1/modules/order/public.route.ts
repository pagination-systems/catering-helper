import express, { type Router } from "express";
import { handleController } from "../../../common/helper";
import { deserializeUserOptional, validate } from "../../../common/middlewares";
import { slugParamsSchema } from "../tenant/validation";
import { createPublicByTenantSlug } from "./controller";
import { createPublicOrderBodySchema } from "./validation";

const router: Router = express.Router();

const validateParams = validate("params");
const validateBody = validate("body");

// Public storefront endpoint — place an order for a tenant, by slug. Auth is
// optional: a signed-in customer's order is linked to their account, while
// anonymous visitors can still check out as guests.
router.post(
  "/tenants/:slug/orders",
  deserializeUserOptional,
  validateParams(slugParamsSchema),
  validateBody(createPublicOrderBodySchema),
  handleController(createPublicByTenantSlug),
);

export default router;
