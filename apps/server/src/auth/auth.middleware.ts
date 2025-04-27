import { OperationalError } from "@/error/OperationalError.js";
import { requestHandler } from "@/util/requestHandler.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getUserIdFromToken } from "./token.util.js";
import { CONSTANTS } from "@/constants/index.js";

export const authTokenVerificationMiddleware = requestHandler(
  async ({ req }) => {
    const token = req.cookies?.[CONSTANTS.ACCESS_TOKEN];
    if (!token) {
      throw new OperationalError(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    }
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
