import express, { type Router } from "express";
import { handleAuthenticatedController } from "../../../common/helper";
import { validate } from "../../../common/middlewares";
import {
  create,
  getOne,
  getOneSoftDeleted,
  hardRemove,
  list,
  listSoftDeleted,
  restore,
  softRemove,
  update,
} from "./controller";
import { createBodySchema, idParamsSchema, updateBodySchema } from "./validation";

const router: Router = express.Router();

const validateBody = validate("body");
const validateParams = validate("params");

router.get("/", handleAuthenticatedController(list));
router.post("/", validateBody(createBodySchema), handleAuthenticatedController(create));

router.get("/trash", handleAuthenticatedController(listSoftDeleted));
router.get("/trash/:id", validateParams(idParamsSchema), handleAuthenticatedController(getOneSoftDeleted));

router.get("/:id", validateParams(idParamsSchema), handleAuthenticatedController(getOne));
router.put(
  "/:id",
  validateParams(idParamsSchema),
  validateBody(updateBodySchema),
  handleAuthenticatedController(update),
);

router.delete("/:id/soft", validateParams(idParamsSchema), handleAuthenticatedController(softRemove));
router.delete("/:id/hard", validateParams(idParamsSchema), handleAuthenticatedController(hardRemove));
router.put("/:id/restore", validateParams(idParamsSchema), handleAuthenticatedController(restore));

export default router;
