import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../../.config/env";
import { TooManyRequestsException } from "../helper";

// Global rate limit middleware
const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  message: "Too many GET requests from this IP, please try again later.",
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    return next(new TooManyRequestsException());
  },
});

export { globalRateLimiter };
