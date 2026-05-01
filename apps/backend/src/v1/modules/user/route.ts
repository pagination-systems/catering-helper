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
  updateUserProfileImage,
} from "./controller";
import { idParamsSchema, profileImageBodySchema, updateBodySchema } from "./validation";

const router: Router = express.Router();

const validateBody = validate("body");
const validateParams = validate("params");

// List & Create
router.get("/", handleAuthenticatedController(list));
router.post("/", handleAuthenticatedController(create));

// Trash (Must come before /:id routes)
router.get("/trash", handleAuthenticatedController(listSoftDeleted));
router.get("/trash/:id", validateParams(idParamsSchema), handleAuthenticatedController(getOneSoftDeleted));

// Read & Update
router.get("/:id", validateParams(idParamsSchema), handleAuthenticatedController(getOne));
router.put("/:id", validateParams(idParamsSchema), validateBody(updateBodySchema), handleAuthenticatedController(update));

// Deletion & Restoration
router.delete("/:id/soft", validateParams(idParamsSchema), handleAuthenticatedController(softRemove));
router.delete("/:id/hard", validateParams(idParamsSchema), handleAuthenticatedController(hardRemove));
router.put("/:id/restore", validateParams(idParamsSchema), handleAuthenticatedController(restore));

// Custom
router.put(
  "/:id/profile-image",
  validateParams(idParamsSchema),
  validateBody(profileImageBodySchema),
  handleAuthenticatedController(updateUserProfileImage),
);

export default router;
