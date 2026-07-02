import { ACCOUNT_TYPE_ENUMS } from "@catering/types";
import type { NextFunction, Request, Response } from "express";
// import "../../types/request-extension";
import type { IUserDoc } from "../../models";
import type { CustomJwtPayload } from "../../v1/modules/token/token.interface";
import * as tokenService from "../../v1/modules/token/token.service";
import * as userService from "../../v1/modules/user";
import { catchAsync, UnauthorizedException } from "../helper";

// deserializeUser middleware
export const deserializeUser = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  // Getting token from cookies or request header
  const accessToken = req.cookies?.__imsat__ || req.header("x-auth-access-token");
  if (!accessToken) {
    return next(new UnauthorizedException("No access token, Please login to get access."));
  }

  // Verify access token
  const decoded = (await tokenService.verifyAccessToken(accessToken)) as CustomJwtPayload;

  if (!decoded.id) {
    return next(new UnauthorizedException("Invalid access token."));
  }

  // Check if access token exists in the database
  const isExists = await tokenService.findAccessToken({ token: accessToken, userId: decoded.id });
  if (!isExists) {
    return next(new UnauthorizedException("Access token is no longer valid."));
  }

  // Check if user still exists
  let currentUser: IUserDoc;
  try {
    currentUser = await userService.getUserById(decoded.id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "User not found.";
    return next(new UnauthorizedException(message));
  }

  // Check if user changed password after the token was issued
  if (typeof decoded.iat !== "number") {
    return next(new UnauthorizedException("Invalid access token."));
  }

  if (currentUser.passwordChangeAfter(decoded.iat)) {
    return next(new UnauthorizedException("User recently changed password! Please log in again."));
  }

  // Customers are not tenant-scoped, so only staff accounts require a tenant.
  if (!currentUser.type) {
    return next(new UnauthorizedException("Invalid user session data."));
  }
  if (currentUser.type !== ACCOUNT_TYPE_ENUMS.CUSTOMER && !currentUser.tenantId) {
    return next(new UnauthorizedException("Invalid user session data."));
  }

  const tenantId = currentUser.tenantId ? currentUser.tenantId.toString() : undefined;

  // Access protected route
  req.session = {
    accessToken,
    tenantId,
    user: {
      id: currentUser._id.toString(),
      _id: currentUser._id.toString(),
      tenantId: tenantId ?? "",
      email: currentUser.email,
      type: currentUser.type,
      role: currentUser.role,
      emailVerificationStatus: currentUser.emailVerificationStatus,
    },
  };

  next();
});

/**
 * Optional-auth variant used by public storefront endpoints. Populates
 * `req.session` when a valid access token is present, but never rejects the
 * request — anonymous visitors continue as guests. Lets a signed-in customer's
 * storefront order be linked to their account while keeping guest checkout open.
 */
export const deserializeUserOptional = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.__imsat__ || req.header("x-auth-access-token");
    if (!accessToken) return next();

    const decoded = (await tokenService.verifyAccessToken(accessToken)) as CustomJwtPayload;
    if (!decoded.id || typeof decoded.iat !== "number") return next();

    const isExists = await tokenService.findAccessToken({ token: accessToken, userId: decoded.id });
    if (!isExists) return next();

    const currentUser = await userService.getUserById(decoded.id);

    if (
      currentUser.passwordChangeAfter(decoded.iat) ||
      !currentUser.type ||
      (currentUser.type !== ACCOUNT_TYPE_ENUMS.CUSTOMER && !currentUser.tenantId)
    ) {
      return next();
    }

    const tenantId = currentUser.tenantId ? currentUser.tenantId.toString() : undefined;

    req.session = {
      accessToken,
      tenantId,
      user: {
        id: currentUser._id.toString(),
        _id: currentUser._id.toString(),
        tenantId: tenantId ?? "",
        email: currentUser.email,
        type: currentUser.type,
        role: currentUser.role,
        emailVerificationStatus: currentUser.emailVerificationStatus,
      },
    };
  } catch {
    // Token invalid/expired — proceed anonymously rather than failing the order.
  }

  return next();
});
