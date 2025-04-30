import winston from "winston";
import type { Request } from "express";
const { combine, timestamp, printf, align } = winston.format;
const logger = winston.createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

export const logInfo = (...info: string[]) => {
  logger.info(info.join(" "));
};

export const logError = (...errors: string[]) => {
  logger.error(errors.join(" "));
};

export const logRequest = (req: Request) => {
  const { method, url } = req;
  logInfo(`Incoming request : ${method} : ${url}`);
};
