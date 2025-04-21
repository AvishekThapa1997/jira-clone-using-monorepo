import { OperationalError } from "@/error/OperationalError.js";
import { requestHandler } from "@/util/requestHandler.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getUserIdFromToken } from "./token.util.js";

export const authTokenVerificationMiddleware = requestHandler(
  async ({ req }) => {
    const headers = req.headers.authorization;
    if (!headers) {
      throw new OperationalError(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    }
    const token = headers.split(" ")[1];
    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new OperationalError(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    }
    req.userId = userId;
  }
);
