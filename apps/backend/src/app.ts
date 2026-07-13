import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { initBullBoard } from "./.config/bull-board";
import { env } from "./.config/env";
import { setupAgenda } from "./agenda";
import { corsOrigin } from "./common/constants";
import { globalErrorHandler, NotFoundException } from "./common/helper";
import { customQueryParser, globalRateLimiter } from "./common/middlewares";
import { setupSwaggerDocs } from "./docs/swagger";
import { setupApiRoutes } from "./v1/routes/api-routes";

export const app: Express = express();

// Behind Caddy: trust the first proxy hop so req.ip / rate-limiting use the real
// client IP from X-Forwarded-For instead of Caddy's address.
app.set("trust proxy", 1);

// Enable CORS request
app.use(cors({ origin: corsOrigin, credentials: true }));

// Set security HTTP headers
app.use(helmet());

// Development Logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request with same API
app.use("/api", globalRateLimiter);

// Body parser, reading data from body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve cookie in request object
app.use(cookieParser());

// Data sanitization against NO-SQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS

// Prevent parameter pollution
app.use(hpp());

// Custom query parser
app.use(customQueryParser);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Active" });
});

// Load API routes
setupSwaggerDocs(app);
const { router: bullBoardRouter, path: bullBoardPath } = initBullBoard();
app.use(bullBoardPath, bullBoardRouter);
setupApiRoutes(app);
setupAgenda(app);

// Global error handler
app.all("*", (req, _res, next) => {
  next(new NotFoundException(`Can't find ${req.method} ${req.originalUrl} on this server.`));
});

app.use(globalErrorHandler);
