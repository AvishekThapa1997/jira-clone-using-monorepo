import { type Payload, requestHandler } from "@/util/requestHandler.js";
import { SignInSchema, SignUpSchema } from "@jira-clone/core/types";
import { StatusCodes } from "http-status-codes";
import {
  getUserSession,
  refreshToken,
  signInUser,
  signUpUser,
} from "./auth.service.js";
import { setRefreshTokenInCookie } from "./token.util.js";
import { CONSTANTS } from "@/constants/index.js";

export const signUpHanlder = requestHandler<Payload<SignUpSchema>>(
  async ({ payload, res }) => {
    const result = await signUpUser(payload);
    const refreshToken = result.data?.refreshToken;
    setRefreshTokenInCookie(refreshToken, res);
    return {
      status: StatusCodes.CREATED,
      result,
    };
  }
);

export const signInHandler = requestHandler<Payload<SignInSchema>>(
  async ({ payload, res }) => {
    const result = await signInUser(payload);
    const refreshToken = result.data?.refreshToken;
    setRefreshTokenInCookie(refreshToken, res);
    return {
      status: StatusCodes.OK,
      result,
    };
  }
);

export const getSessionHandler = requestHandler(async ({ req }) => {
  const userId = req.userId;
  const result = await getUserSession(userId);
  return {
    status: StatusCodes.OK,
    result,
  };
});

export const refreshTokenHandler = requestHandler(async ({ req, res }) => {
  const existingRefreshToken = req.cookies[CONSTANTS.REFRESH_TOKEN] as string;
  const result = await refreshToken(existingRefreshToken);
  const newRefreshToken = result.data?.refreshToken;
  setRefreshTokenInCookie(newRefreshToken, res);
  return {
    status: StatusCodes.OK,
    result,
  };
});
