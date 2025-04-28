import { CONSTANTS } from "@/constants/index.js";
import { userDtoMapper } from "@/repository/user/userdto.mapper.js";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "@/repository/user/user.repository.js";

import { signInSchema, signUpSchema } from "@jira-clone/core/schema/auth";
import {
  Result,
  SignInSchema,
  type SignUpSchema,
  TokenResult,
  UserDto,
} from "@jira-clone/core/types";
import { parseSchema, tryCatch } from "@jira-clone/core/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  comparePassword,
  generatePasswordSalt,
  hashPassword,
} from "./password.util.js";
import {
  createAuthTokensAndStoreInRedis,
  getUserIdFromToken,
} from "./token.util.js";

type SignUpUserResult = Result<TokenResult, SignUpSchema>;
type SignInUserResult = Result<TokenResult>;
/**
 * Handles the user sign-up process.
 *
 * @param signUpPayload - The payload containing user sign-up details.
 * @returns A promise that resolves to the result of the sign-up process,
 *          including either the created user data and tokens or an error.
 */
export const signUpUser = tryCatch(
  async (signUpPayload: SignUpSchema): Promise<SignUpUserResult> => {
    const { data, errors } = parseSchema(signUpSchema, signUpPayload);
    const result: SignUpUserResult = {};
    if (!data) {
      result.error = {
        message: CONSTANTS.VALIDATION_ERRORS,
        code: StatusCodes.BAD_REQUEST,
        validationErrors: errors,
      };
      return result;
    }
    const { email, name, password } = data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      result.error = {
        message: CONSTANTS.EMAIL_IS_ALREADY_REGISTERED,
        code: StatusCodes.CONFLICT,
      };
      return result;
    }
    const passwordSalt = generatePasswordSalt();
    const hashedPassword = await hashPassword(password, passwordSalt);
    const newUser = await createUser({
      email,
      name,
      password: hashedPassword,
      passwordSalt,
    });
    if (!newUser) {
      result.error = {
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
      return result;
    }
    const tokenResult = await createAuthTokensAndStoreInRedis(newUser);
    if (!tokenResult) {
      result.error = {
        message: CONSTANTS.ACCOUNT_CREATED_TOKEN_FAILED_MSG,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
      return result;
    }
    const { accessToken, expireAt, refreshToken } = tokenResult;

    result.data = {
      accessToken,
      expireAt,
      refreshToken,
      user: newUser,
    };
    return result;
  }
);

/**
 * Signs in a user by validating their credentials and generating authentication tokens.
 *
 * @param signInPayload - The payload containing the user's email and password.
 * @returns A promise that resolves to a `SignInUserResult` object containing either the user's data and tokens
 *          or an error message with the corresponding status code.
 */
export const signInUser = tryCatch(
  async (signInPayload: SignInSchema): Promise<SignInUserResult> => {
    const { data } = parseSchema(signInSchema, signInPayload);
    const result: SignInUserResult = {};
    if (!data) {
      result.error = {
        message: CONSTANTS.EMAIL_OR_PASSWORD_IS_INCORRECT,
        code: StatusCodes.BAD_REQUEST,
      };
      return result;
    }
    const { email, password } = data;
    const user = await getUserByEmail(email, true);
    if (!user) {
      result.error = {
        message: CONSTANTS.EMAIL_OR_PASSWORD_IS_INCORRECT,
        code: StatusCodes.BAD_REQUEST,
      };
      return result;
    }

    const isPasswordSame = await comparePassword(
      user.password,
      password,
      user.password_salt
    );
    if (!isPasswordSame) {
      result.error = {
        message: CONSTANTS.EMAIL_OR_PASSWORD_IS_INCORRECT,
        code: StatusCodes.UNAUTHORIZED,
      };
      return result;
    }
    const tokenResult = await createAuthTokensAndStoreInRedis(user);
    if (!tokenResult) {
      result.error = {
        message: CONSTANTS.UNABLE_TO_LOGIN,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
      return result;
    }
    const { accessToken, expireAt, refreshToken } = tokenResult;
    const userDto = userDtoMapper.mapToDto(user);
    return {
      data: {
        accessToken,
        expireAt,
        refreshToken,
        user: userDto,
      },
    };
  }
);

export const getUserSession = tryCatch(
  async (userId: string): Promise<Result<UserDto>> => {
    const result: Result<UserDto> = {};
    const user = await getUserById(userId);
    if (!user) {
      result.error = {
        code: StatusCodes.UNAUTHORIZED,
        message: ReasonPhrases.UNAUTHORIZED,
      };
    } else {
      result.data = user;
    }
    return result;
  }
);

export const refreshToken = tryCatch(
  async (currentRefreshToken: string): Promise<Result<TokenResult>> => {
    const tokenResult: Result<TokenResult> = {};
    const userId = await getUserIdFromToken(currentRefreshToken);
    if (!userId) {
      tokenResult.error = {
        code: StatusCodes.UNAUTHORIZED,
        message: ReasonPhrases.UNAUTHORIZED,
      };
      return tokenResult;
    }
    const user = await getUserById(userId);
    if (!user) {
      tokenResult.error = {
        code: StatusCodes.UNAUTHORIZED,
        message: ReasonPhrases.UNAUTHORIZED,
      };
      return tokenResult;
    } else {
      const tokens = await createAuthTokensAndStoreInRedis(user);
      if (!tokens) {
        tokenResult.error = {
          code: StatusCodes.UNAUTHORIZED,
          message: ReasonPhrases.UNAUTHORIZED,
        };
        return tokenResult;
      }
      const { accessToken, expireAt, refreshToken } = tokens;
      return {
        data: {
          accessToken,
          expireAt,
          refreshToken,
          user,
        },
      };
    }
  }
);
