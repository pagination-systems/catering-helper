import express, { type Router } from "express";
import { handleAuthenticatedController } from "../../../common/helper";
import { validate } from "../../../common/middlewares";
import { create, getOne, list } from "./controller";
import { createTenantBodySchema, idParamsSchema } from "./validation";

const router: Router = express.Router();

const validateBody = validate("body");
const validateParams = validate("params");

// List & Create
router.get("/", handleAuthenticatedController(list));
router.post("/", validateBody(createTenantBodySchema), handleAuthenticatedController(create));

// Read
router.get("/:id", validateParams(idParamsSchema), handleAuthenticatedController(getOne));

export default router;
