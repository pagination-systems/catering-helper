import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "production" | "test";

interface EnvConfig {
  MONGO_URL: string;
  DATABASE_NAME: string;
  CLIENT_URL: string;
  PORT: number;
  NODE_ENV: NodeEnv;
  LOG_LEVEL: string;
  AWS_ACCESS_KEY?: string;
  AWS_ACCESS_KEY_SECRET?: string;
  AWS_PRIVATE_MEDIA_BUCKET?: string;
  AWS_PUBLIC_MEDIA_BUCKET?: string;
  PUBLIC_MEDIA_BASE_URL?: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: number;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRY: number;
  INVITATION_TOKEN_EXPIRY?: number;
  JWT_KEY: string;
  REGISTRATION_TOKEN_EXPIRY: number;
  RECOVERY_TOKEN_EXPIRY: number;
  QUOTATION_TOKEN_EXPIRY?: number;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
  EMAIL_SENDER: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  SEND_GRID_API_KEY?: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  GOOGLE_API_KEY?: string;
  ADMIN_USER_EMAIL?: string;
  ADMIN_USER_PASSWORD?: string;
  KANBAN_REBALANCE_BASE_GAP?: number;
  KANBAN_MIN_RANK_GAP?: number;
  KANBAN_EDGE_RANK_GAP?: number;
}

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const readString = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (value) return value;
  if (fallback !== undefined) return fallback;

  return fail(`❌ CRITICAL: ${key} is missing in environment variables. Shutting down.`);
};

const readOptionalString = (key: string): string | undefined => process.env[key];

const readNumber = (key: string, fallback?: number): number => {
  const value = process.env[key];
  if (value === undefined || value === "") {
    if (fallback !== undefined) return fallback;

    return fail(`❌ CRITICAL: ${key} is missing in environment variables. Shutting down.`);
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fail(`❌ CRITICAL: ${key} must be a valid number. Shutting down.`);
  }

  return parsed;
};

const readOptionalNumber = (key: string): number | undefined => {
  const value = process.env[key];
  if (value === undefined || value === "") return undefined;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fail(`❌ CRITICAL: ${key} must be a valid number. Shutting down.`);
  }

  return parsed;
};

const validateEnv = (): EnvConfig => {
  const MONGO_URL = readString("MONGO_URL");
  const DATABASE_NAME = readString("DATABASE_NAME");
  const CLIENT_URL = readString("CLIENT_URL");
  const PORT = readNumber("PORT", 9027);
  const NODE_ENV = readString("NODE_ENV", "development") as NodeEnv;
  const LOG_LEVEL = readString("LOG_LEVEL", "info");
  const AWS_ACCESS_KEY = readOptionalString("AWS_ACCESS_KEY");
  const AWS_ACCESS_KEY_SECRET = readOptionalString("AWS_ACCESS_KEY_SECRET");
  const AWS_PRIVATE_MEDIA_BUCKET = readOptionalString("AWS_PRIVATE_MEDIA_BUCKET");
  const AWS_PUBLIC_MEDIA_BUCKET = readOptionalString("AWS_PUBLIC_MEDIA_BUCKET");
  const PUBLIC_MEDIA_BASE_URL = readOptionalString("PUBLIC_MEDIA_BASE_URL");
  const ACCESS_TOKEN_SECRET = readString("ACCESS_TOKEN_SECRET");
  const ACCESS_TOKEN_EXPIRY = readNumber("ACCESS_TOKEN_EXPIRY");
  const REFRESH_TOKEN_SECRET = readString("REFRESH_TOKEN_SECRET");
  const REFRESH_TOKEN_EXPIRY = readNumber("REFRESH_TOKEN_EXPIRY");
  const INVITATION_TOKEN_EXPIRY = readOptionalNumber("INVITATION_TOKEN_EXPIRY");
  const JWT_KEY = readString("JWT_KEY");
  const REGISTRATION_TOKEN_EXPIRY = readNumber("REGISTRATION_TOKEN_EXPIRY");
  const RECOVERY_TOKEN_EXPIRY = readNumber("RECOVERY_TOKEN_EXPIRY");
  const QUOTATION_TOKEN_EXPIRY = readOptionalNumber("QUOTATION_TOKEN_EXPIRY");
  const RATE_LIMIT_WINDOW_MS = readNumber("RATE_LIMIT_WINDOW_MS", 15 * 60 * 1000);
  const RATE_LIMIT_MAX = readNumber("RATE_LIMIT_MAX", 100);
  const EMAIL_SENDER = readString("EMAIL_SENDER", "default@example.com");
  const EMAIL_HOST = readString("EMAIL_HOST");
  const EMAIL_PORT = readNumber("EMAIL_PORT");
  const EMAIL_USERNAME = readString("EMAIL_USERNAME");
  const EMAIL_PASSWORD = readString("EMAIL_PASSWORD");
  const SEND_GRID_API_KEY = readOptionalString("SEND_GRID_API_KEY");
  const REDIS_HOST = readString("REDIS_HOST");
  const REDIS_PORT = readNumber("REDIS_PORT");
  const REDIS_PASSWORD = readOptionalString("REDIS_PASSWORD");
  const GOOGLE_API_KEY = readOptionalString("GOOGLE_API_KEY");
  const ADMIN_USER_EMAIL = readOptionalString("ADMIN_USER_EMAIL");
  const ADMIN_USER_PASSWORD = readOptionalString("ADMIN_USER_PASSWORD");
  const KANBAN_REBALANCE_BASE_GAP = readOptionalNumber("KANBAN_REBALANCE_BASE_GAP");
  const KANBAN_MIN_RANK_GAP = readOptionalNumber("KANBAN_MIN_RANK_GAP");
  const KANBAN_EDGE_RANK_GAP = readOptionalNumber("KANBAN_EDGE_RANK_GAP");

  return Object.freeze({
    MONGO_URL,
    DATABASE_NAME,
    CLIENT_URL,
    PORT,
    NODE_ENV,
    LOG_LEVEL,
    AWS_ACCESS_KEY,
    AWS_ACCESS_KEY_SECRET,
    AWS_PRIVATE_MEDIA_BUCKET,
    AWS_PUBLIC_MEDIA_BUCKET,
    PUBLIC_MEDIA_BASE_URL,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    INVITATION_TOKEN_EXPIRY,
    JWT_KEY,
    REGISTRATION_TOKEN_EXPIRY,
    RECOVERY_TOKEN_EXPIRY,
    QUOTATION_TOKEN_EXPIRY,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
    EMAIL_SENDER,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    SEND_GRID_API_KEY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    GOOGLE_API_KEY,
    ADMIN_USER_EMAIL,
    ADMIN_USER_PASSWORD,
    KANBAN_REBALANCE_BASE_GAP,
    KANBAN_MIN_RANK_GAP,
    KANBAN_EDGE_RANK_GAP,
  });
};

export const env = validateEnv();
