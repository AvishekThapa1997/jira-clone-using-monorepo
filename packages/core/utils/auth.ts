import type { Result } from "types/shared.js";
import { AUTH_API, CONSTANTS } from "../constants/auth.js";
import { publicFetch, tryCatch } from "./shared.js";
import type { AuthResult } from "types/auth.js";

/**
 * Stores the access token expiration time in the local storage.
 *
 * @param accessTokenExpiration - The expiration time of the access token as a string.
 * This value is stored under the key defined by `CONSTANTS.ACCESS_TOKEN_EXPIRATION_KEY`.
 */
export const setTokenExpirationInLocalStorage = (
  accessTokenExpiration: string
) => {
  localStorage.setItem(
    CONSTANTS.ACCESS_TOKEN_EXPIRATION_KEY,
    accessTokenExpiration
  );
};

/**
 * Checks if the current access token is valid based on its expiration time.
 *
 * @returns {boolean} `true` if the token is valid, otherwise `false`.
 */
export const checkIfCurrentTokenIsValid = (): boolean => {
  const tokenExpiration = localStorage.getItem(
    CONSTANTS.ACCESS_TOKEN_EXPIRATION_KEY
  );
  if (!tokenExpiration) {
    return false;
  }

  const tokenExpirationTime = new Date(tokenExpiration).getTime();
  const diff = Math.abs(tokenExpirationTime - Date.now());
  return diff > CONSTANTS.ACCESS_TOKEN_EXPIRATION_THRESHOLD;
};

/**
 * Attempts to refresh the access token if the current token is invalid or if forced.
 *
 * @param forceRefresh - A boolean indicating whether to force a token refresh
 * regardless of its validity. Defaults to `false`.
 *
 * @returns A promise that resolves to `true` if the token is successfully refreshed
 * or is already valid, and `false` if the refresh fails or the user is not authenticated.
 */
export const refreshAccessToken = tryCatch(
  async (forceRefresh: boolean = false) => {
    const isTokenValid = checkIfCurrentTokenIsValid();
    if (isTokenValid && !forceRefresh) {
      return true;
    } else {
      const { url } = AUTH_API.REFRESH_TOKEN;
      const result = await publicFetch<Result<AuthResult>>(url, {
        credentials: "include",
      });
      if (result.data?.user.id) {
        return true;
      }
      return false;
    }
  }
);
