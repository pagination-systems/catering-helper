import express, { type Router } from "express";
import { handleAuthenticatedController } from "../../../common/helper";
import { validate } from "../../../common/middlewares";
import { create, getOne, list, remove, update } from "./controller";
import { createOrderBodySchema, idParamsSchema, updateOrderBodySchema } from "./validation";

const router: Router = express.Router();

const validateBody = validate("body");
const validateParams = validate("params");

// List & Create
router.get("/", handleAuthenticatedController(list));
router.post("/", validateBody(createOrderBodySchema), handleAuthenticatedController(create));

// Update (id supplied in body to match the admin panel client)
router.put("/", validateBody(updateOrderBodySchema), handleAuthenticatedController(update));

// Read & Delete
router.get("/:id", validateParams(idParamsSchema), handleAuthenticatedController(getOne));
router.delete("/:id", validateParams(idParamsSchema), handleAuthenticatedController(remove));

export default router;
