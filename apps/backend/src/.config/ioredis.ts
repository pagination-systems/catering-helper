import IORedis, { type RedisOptions } from "ioredis";

export const redisOptions: RedisOptions = {
  // todo - import from env file
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT!),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

export const redisConnection = new IORedis(redisOptions);
