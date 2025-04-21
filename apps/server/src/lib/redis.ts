import { appConfig } from "@/config/environment/index.js";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: appConfig.UPSTASH_REDIS_URL,
  token: appConfig.UPSTASH_REDIS_TOKEN,
});

export { redis };
