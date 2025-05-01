import type { RequestHandler } from "express";
import { requestHandler } from "./requestHandler.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const notFoundHandler: RequestHandler = requestHandler(async () => {
  return {
    status: StatusCodes.NOT_FOUND,
    result: {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: ReasonPhrases.NOT_FOUND,
      },
    },
  };
});
