import express, { type Router } from "express";
import { handleAuthenticatedController, handleController } from "../../../common/helper";
import { deserializeUser, validate } from "../../../common/middlewares";
import {
  changeMyPassword,
  login,
  logout,
  me,
  recoverAccount,
  refreshAccessToken,
  registration,
  resendVerification,
  updateMe,
  verifyRecovery,
  verifyRegistration,
} from "./auth.controller";
import {
  changePasswordBodySchema,
  loginBodySchema,
  recoverAccountBodySchema,
  registerBodySchema,
  resendVerificationBodySchema,
  updateMeBodySchema,
  verifyRecoveryBodySchema,
  verifyRecoveryQuerySchema,
  verifyRegistrationQuerySchema,
} from "./auth.validation";

const router: Router = express.Router();

const validateBody = validate("body");
const validateQuery = validate("query");

router.post("/login", validateBody(loginBodySchema), handleController(login));
router.post("/registration", validateBody(registerBodySchema), handleController(registration));
router.post(
  "/registration/verification",
  validateQuery(verifyRegistrationQuerySchema),
  handleController(verifyRegistration),
);
router.post(
  "/registration/verification/email",
  validateBody(resendVerificationBodySchema),
  handleController(resendVerification),
);
router.post("/recovery", validateBody(recoverAccountBodySchema), handleController(recoverAccount));
router.post(
  "/recovery/verification",
  validateQuery(verifyRecoveryQuerySchema),
  validateBody(verifyRecoveryBodySchema),
  handleController(verifyRecovery),
);
// router.get(
//   "/refresh-access-token",
//   validateCookies(refreshAccessTokenCookieSchema),
//   handleController(refreshAccessToken)
// );
// router.delete("/logout", validateCookies(logoutCookieSchema), handleController(logout));
router.get("/refresh-access-token", handleController(refreshAccessToken));
router.get("/me", deserializeUser, handleAuthenticatedController(me));
router.put("/me", deserializeUser, validateBody(updateMeBodySchema), handleAuthenticatedController(updateMe));
router.put(
  "/me/password",
  deserializeUser,
  validateBody(changePasswordBodySchema),
  handleAuthenticatedController(changeMyPassword),
);
router.delete("/logout", handleController(logout));

export default router;
