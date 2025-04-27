declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT?: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    REDIS_URL: string;
    TOKEN_SECRET: string;
    UPSTASH_REDIS_URL: string;
    UPSTASH_REDIS_TOKEN: string;
    // Add more env vars here
  }
}
