import express, { type Router } from "express";
import { handleController } from "../../../common/helper";
import { validate } from "../../../common/middlewares";
import { getBySlug, listPublic } from "./controller";
import { slugParamsSchema } from "./validation";

const router: Router = express.Router();

const validateParams = validate("params");

// Public storefront / directory endpoints (no authentication required)
router.get("/tenants", handleController(listPublic));
router.get("/tenants/:slug", validateParams(slugParamsSchema), handleController(getBySlug));

export default router;
