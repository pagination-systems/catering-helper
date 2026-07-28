import express, { type Router } from "express";
import { handleController } from "../../../common/helper";
import { validate } from "../../../common/middlewares";
import { slugParamsSchema } from "../tenant/validation";
import { listPublicByTenantSlug } from "./controller";

const router: Router = express.Router();

const validateParams = validate("params");

// Public storefront endpoint — active packages for a tenant, by slug (no auth).
router.get("/tenants/:slug/packages", validateParams(slugParamsSchema), handleController(listPublicByTenantSlug));

export default router;
