import { type Payload, requestHandler } from "@/util/requestHandler.js";
import type {
  AuthResult,
  SignInSchema,
  SignUpSchema,
  TokenResult,
} from "@jira-clone/core/types";
import { StatusCodes } from "http-status-codes";
import {
  getUserSession,
  refreshToken,
  signInUser,
  signUpUser,
} from "./auth.service.js";
import { setRefreshTokenInCookie } from "./token.util.js";
import { CONSTANTS } from "@/constants/index.js";
import type { Response } from "express";

/**
 * Handles the successful authentication process by setting tokens in cookies
 * and returning an authentication result.
 *
 * @param tokenResult - The result of the token generation process, containing
 *                      access token, refresh token, expiration time, and user details.
 * @param res - The HTTP response object used to set cookies for the tokens.
 * @returns An object containing the HTTP status code and the authentication result,
 *          which includes the access token, expiration time and user details.
 */
const handleAuthSuccess = (tokenResult: TokenResult, res: Response) => {
  const { accessToken, refreshToken, expireAt, user } = tokenResult;
  setRefreshTokenInCookie(refreshToken, res);
  const authResult: AuthResult = {
    expireAt,
    user,
    accessToken,
  };
  return authResult;
};

/**
 * Handles the user sign-up process.
 *
 * This function is a request handler that processes the sign-up payload,
 * creates a new user, and sets the appropriate authentication tokens
 * in the response cookies upon successful registration.
 *
 * @template T - The type of the payload, extending `SignUpSchema`.
 * @param {Payload<SignUpSchema>} payload - The payload containing the user sign-up data.
 * @param {Response} res - The HTTP response object used to set cookies.
 * @returns {Promise<{ status: number; result: any }>} An object containing the HTTP status code
 * and the result of the sign-up operation.
 *
 * @throws {Error} If the sign-up process fails or an unexpected error occurs.
 */
export const signUpHanlder = requestHandler<Payload<SignUpSchema>>(
  async ({ payload, res }) => {
    const result = await signUpUser(payload);
    if (result?.data) {
      const authResult = handleAuthSuccess(result.data, res);
      return {
        status: StatusCodes.CREATED,
        result: {
          data: authResult,
        },
      };
    }
    return {
      status: result?.error?.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      result,
    };
  }
);

/**
 * Handles the sign-in process for a user.
 *
 * This function is a request handler that processes the sign-in request,
 * validates the payload against the `SignInSchema`, and attempts to sign in
 * the user. If successful, it sets the refresh token and access token in
 * cookies and returns the result.
 *
 * @template Payload - The payload type, which adheres to the `SignInSchema`.
 *
 * @param {Object} context - The context object containing the request data.
 * @param {Payload<SignInSchema>} context.payload - The payload containing the user's sign-in credentials.
 * @param {Response} context.res - The response object used to set cookies.
 *
 * @returns {Promise<{ status: number; result: any }>} A promise that resolves to an object containing
 * the HTTP status code and the result of the sign-in operation.
 *
 * @throws {Error} If the sign-in process fails or an unexpected error occurs.
 */
export const signInHandler = requestHandler<Payload<SignInSchema>>(
  async ({ payload, res }) => {
    const result = await signInUser(payload);
    if (result?.data) {
      const authResult = handleAuthSuccess(result.data, res);
      return {
        status: StatusCodes.OK,
        result: {
          data: authResult,
        },
      };
    }
    return {
      status: result?.error?.code ?? StatusCodes.OK,
      result,
    };
  }
);

/**
 * Handles the retrieval of a user session.
 *
 * This function is an HTTP request handler that retrieves the session
 * information for the currently authenticated user based on their user ID.
 *
 * @async
 * @function
 * @param {Object} context - The context object containing the request.
 * @param {Object} context.req - The HTTP request object.
 * @param {string} context.req.userId - The ID of the authenticated user.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 * - `status` (number): The HTTP status code (200 OK).
 * - `result` (any): The session data for the user.
 */
export const getSessionHandler = requestHandler(async ({ req }) => {
  const userId = req.userId;
  const result = await getUserSession(userId);
  return {
    status: StatusCodes.OK,
    result,
  };
});

/**
 * Handles the refresh token process by validating the existing refresh token
 * from the request cookies, generating a new access token and refresh token,
 * and setting them in the response cookies.
 *
 * @async
 * @function
 * @param {Object} context - The context object containing the request and response.
 * @param {Request} context.req - The HTTP request object.
 * @param {Response} context.res - The HTTP response object.
 * @returns {Promise<{ status: number, result: any }>} An object containing the HTTP status code
 * and the result of the refresh token operation.
 *
 * @throws {Error} Throws an error if the refresh token process fails.
 */
export const refreshTokenHandler = requestHandler(async ({ req, res }) => {
  const existingRefreshToken = req.cookies[CONSTANTS.REFRESH_TOKEN] as string;
  const result = await refreshToken(existingRefreshToken);
  if (result?.data) {
    const authResult = handleAuthSuccess(result.data, res);
    return {
      status: StatusCodes.CREATED,
      result: {
        data: authResult,
      },
    };
  }
  return {
    status: StatusCodes.OK,
    result,
  };
});
