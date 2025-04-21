// Adjust the import path as needed

import { CONSTANTS } from "@/constants/index.js";
import { redis } from "@/lib/redis.js";
import { isDevEnvironment } from "@/util/shared.js";
import { JwtTokenPayload, type UserDto } from "@jira-clone/core/types";
import { type Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";

/**
 * Generates a key for storing or retrieving a token.
 * @param {string} token - The token string.
 * @returns {string} A formatted key for the token.
 */
export function getTokenKey(token: string): string {
  return `token:${token}`;
}

/**
 * Creates a JSON Web Token (JWT) for a given user with a specified expiration time.
 *
 * @param user - The user data transfer object (DTO) containing user information.
 * @param expiration - The expiration time for the token in seconds.
 * @returns A promise that resolves to the generated JWT as a string.
 *
 * @throws Will reject the promise if there is an error during token generation.
 */
export function createToken(
  user: UserDto,
  expiration: number
): Promise<string> {
  const tokenPayload: JwtTokenPayload = {
    userId: user.id,
  };
  const tokenSecret = process.env.TOKEN_SECRET;
  const tokenOptions: SignOptions = {
    expiresIn: expiration,
  };
  return new Promise<string>((resolve, reject) => {
    jwt.sign(tokenPayload, tokenSecret, tokenOptions, (err, token) => {
      if (token) {
        resolve(token);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * Generates an access token and a refresh token for the given user.
 *
 * @param user - The user data transfer object (DTO) containing user information.
 * @returns An object containing the generated `accessToken` and `refreshToken` if successful, or `null` if token generation fails.
 */
export async function generateAccessAndRefreshToken(user: UserDto) {
  const accessTokenPromise = createToken(
    user,
    CONSTANTS.ACCESS_TOKEN_EXPIRATION
  );
  const refreshTokenPromise = createToken(
    user,
    CONSTANTS.REFRESH_TOKEN_EXPIRATION
  );
  const [accessTokenResult, refreshTokenResult] = await Promise.allSettled([
    accessTokenPromise,
    refreshTokenPromise,
  ]);
  if (
    accessTokenResult.status === "fulfilled" &&
    refreshTokenResult.status === "fulfilled"
  ) {
    return {
      accessToken: accessTokenResult.value,
      refreshToken: refreshTokenResult.value,
    };
  }
  return null;
}

/**
 * Creates authentication tokens (access and refresh tokens) for a user,
 * stores them in Redis with expiration times, and returns the tokens along
 * with the access token's expiration timestamp.
 *
 * @param user - The user data transfer object (DTO) containing user information.
 * @returns A promise that resolves to an object containing the access token,
 *          refresh token, and the access token's expiration timestamp in ISO format,
 *          or `null` if token generation fails.
 *
 * @throws Will throw an error if Redis client initialization fails or if there
 *         are issues with storing tokens in Redis.
 */
export async function createAuthTokensAndStoreInRedis(user: UserDto) {
  const tokens = await generateAccessAndRefreshToken(user);
  if (!tokens) {
    return null;
  }
  const { accessToken, refreshToken } = tokens;
  const accessTokenExpiration = new Date(
    Date.now() + CONSTANTS.ACCESS_TOKEN_EXPIRATION
  );

  if (!isDevEnvironment()) {
    const accessTokenKey = getTokenKey(accessToken);
    const refreshTokenKey = getTokenKey(refreshToken);
    await Promise.allSettled([
      redis.set(accessTokenKey, user.id, {
        ex: CONSTANTS.ACCESS_TOKEN_EXPIRATION / 1000,
      }),
      redis.set(refreshTokenKey, user.id, {
        ex: CONSTANTS.REFRESH_TOKEN_EXPIRATION / 1000,
      }),
    ]);
  }
  return {
    accessToken,
    refreshToken,
    expireAt: accessTokenExpiration.toISOString(),
  };
}

/**
 * Retrieves the user ID associated with a given token.
 *
 * This function extracts the token key from the provided token,
 * connects to a Redis client, and fetches the user ID associated
 * with the token key from the Redis store.
 *
 * @param token - The token string used to identify the user.
 * @returns A promise that resolves to the user ID as a string, or `null` if no user ID is found.
 */
export const getUserIdFromToken = async (token: string) => {
  if (isDevEnvironment()) {
    return verifyToken(token);
  }
  const tokenKey = getTokenKey(token);
  return redis.get<string>(tokenKey);
};

/**
 * Verifies a given JWT token and resolves with the user ID if the token is valid.
 *
 * @param token - The JWT token to be verified.
 * @returns A promise that resolves with the user ID extracted from the token payload.
 * @throws An error if the token verification fails.
 */
const verifyToken = async (token: string) => {
  return new Promise<string>((resolve, reject) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    jwt.verify(token, tokenSecret, function (err, tokenData) {
      if (err) {
        reject(err);
      } else {
        const tokenPayload = tokenData as JwtTokenPayload;
        resolve(tokenPayload.userId);
      }
    });
  });
};

/**
 * Sets a refresh token in the HTTP response cookie.
 *
 * @param refreshToken - The refresh token to be stored in the cookie.
 * @param res - The HTTP response object used to set the cookie.
 *
 * The cookie is configured with the following properties:
 * - `httpOnly`: Ensures the cookie is accessible only by the web server.
 * - `secure`: Indicates if the cookie should only be sent over HTTPS. Enabled in production.
 * - `sameSite`: Restricts the cookie to same-site requests.
 * - `maxAge`: Specifies the expiration time for the cookie, based on a constant value.
 */
export const setRefreshTokenInCookie = (
  refreshToken: string = "",
  res: Response
) => {
  res.cookie(CONSTANTS.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: CONSTANTS.REFRESH_TOKEN_EXPIRATION,
  });
};
