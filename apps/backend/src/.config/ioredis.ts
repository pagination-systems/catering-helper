import IORedis, { type RedisOptions } from "ioredis";
import { env } from "./env";

export const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

export const redisConnection = new IORedis(redisOptions);
