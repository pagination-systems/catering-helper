import dotenv from "dotenv";
dotenv.config();

// 1. Define the exact shape of your validated environment
interface EnvConfig {
  MONGO_URL: string;
  DATABASE_NAME: string;
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  AWS_ACCESS_KEY?: string;
  AWS_ACCESS_KEY_SECRET?: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
}

const validateEnv = (): EnvConfig => {
  // --- MANDATORY VARIABLES ---
  const MONGO_URL = process.env.MONGO_URL;
  const DATABASE_NAME = process.env.DATABASE_NAME;

  if (!MONGO_URL) {
    console.error(
      "❌ CRITICAL: MONGO_URL is missing in environment variables. Shutting down.",
    );
    process.exit(1);
  }

  if (!DATABASE_NAME) {
    console.error(
      "❌ CRITICAL: DATABASE_NAME is missing in environment variables. Shutting down.",
    );
    process.exit(1);
  }

  // --- OPTIONAL VARIABLES ---
  let PORT = process.env.PORT;
  if (!PORT) {
    console.warn(
      "⚠️ WARNING: PORT is not defined in environment variables. Defaulting to 3000.",
    );
    PORT = "3000";
  }

  let NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV) {
    console.warn(
      "⚠️ WARNING: NODE_ENV is not defined. Defaulting to 'development'.",
    );
    NODE_ENV = "development";
  }

  let AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
  let AWS_ACCESS_KEY_SECRET = process.env.AWS_ACCESS_KEY_SECRET;
  if (!AWS_ACCESS_KEY && !AWS_ACCESS_KEY_SECRET) {
    console.info(
      "ℹ️ INFO: AWS_ACCESS_KEY and AWS_ACCESS_KEY_SECRET are not set. S3 functionality will be disabled.",
    );
  }
  let RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS;
  let RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX;
  if (!RATE_LIMIT_WINDOW_MS) {
    console.warn(
      "⚠️ WARNING: RATE_LIMIT_WINDOW_MS is not defined. Defaulting to 15 minutes.",
    );
    RATE_LIMIT_WINDOW_MS = (15 * 60 * 1000).toString(); // 15 minutes in ms
  }
  if (!RATE_LIMIT_MAX) {
    console.warn(
      "⚠️ WARNING: RATE_LIMIT_MAX is not defined. Defaulting to 100 requests.",
    );
    RATE_LIMIT_MAX = "100";
  }

  // --- RETURN TYPE-SAFE OBJECT ---
  // Object.freeze prevents other parts of the app from accidentally modifying these variables at runtime
  return Object.freeze({
    MONGO_URL,
    DATABASE_NAME,
    PORT: parseInt(PORT, 10), // Parse to number so you don't have to do it later
    NODE_ENV: NODE_ENV as EnvConfig["NODE_ENV"],
    AWS_ACCESS_KEY,
    AWS_ACCESS_KEY_SECRET,
    RATE_LIMIT_WINDOW_MS: parseInt(RATE_LIMIT_WINDOW_MS, 10),
    RATE_LIMIT_MAX: parseInt(RATE_LIMIT_MAX, 10),
  });
};

// Export a single, initialized instance
export const env = validateEnv();
