import { OperationalError } from "@/error/OperationalError.js";
import { logError } from "@/lib/logger.js";
import { Result } from "@jira-clone/core/types";
import { type ErrorRequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  const result: Result<void> = {
    error: {
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    },
  };
  let status = StatusCodes.INTERNAL_SERVER_ERROR;
  if (err instanceof OperationalError) {
    logError(
      `Error code: ${err.status}, Message: ${err.message}, stack: ${err.stack}`
    );
    result.error = {
      message: err.message,
      code: err.status,
      validationErrors: err.errors,
    };
  } else if (err instanceof Error) {
    logError(`Message: ${err.message}, stack: ${err.stack}`);
    result.error = {
      message: err.message,
      code: status,
    };
  }

  if (process.env.NODE_ENV === "development" && err.stack) {
    res.status(status).json({
      ...result,
      stack: err.stack,
    });
  } else {
    res.status(status).json(result);
  }
};
