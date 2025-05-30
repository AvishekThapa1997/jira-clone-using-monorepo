import { AUTH_API } from "@jira-clone/core/constants/auth";
import type {
  AuthResult,
  Result,
  SignInSchema,
  SignUpSchema,
  UserDto,
  ValidationError,
} from "@jira-clone/core/types";
import {
  api,
  getAccessToken,
  handleError,
  setTokenDetailsInLocalStorage,
  tryCatch,
} from "@jira-clone/core/utils";
import { getAuth } from "@jira-clone/firebase/auth";

export const signOutUser = async (): Promise<Result<void>> => {
  try {
    const { auth, signOut } = await getAuth();
    await signOut(auth);
    return {};
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
};

export const signUpUser = tryCatch(
  async ({
    email,
    password,
    name,
  }: SignUpSchema): Promise<Result<UserDto, ValidationError<SignUpSchema>>> => {
    const { url, headers } = AUTH_API.SIGN_UP;
    const result = await api.post<Result<AuthResult>, SignUpSchema>({
      url,
      requestConfig: {
        body: {
          email,
          name,
          password,
        },
        headers,
      },
      requireAuth: false,
    });
    if (result.data) {
      const { accessToken, expireAt } = result.data;
      setTokenDetailsInLocalStorage(accessToken, expireAt);
      const user = result.data.user;
      return {
        data: user,
      };
    }
    return {
      error: result.error,
    };
  }
);

export const signInUser = tryCatch(
  async ({ email, password }: SignInSchema): Promise<Result<UserDto>> => {
    const { url, headers } = AUTH_API.SIGN_IN;
    const result = await api.post<Result<AuthResult>, SignInSchema>({
      url,
      requestConfig: {
        body: {
          email,
          password,
        },
        headers,
      },
      requireAuth: false,
    });
    if (result.data) {
      const { accessToken, expireAt } = result.data;
      setTokenDetailsInLocalStorage(accessToken, expireAt);
      const user = result.data?.user;
      return {
        data: user,
      };
    }
    return {
      error: result.error,
    };
  }
);

export const getUserSession = tryCatch(async () => {
  const { user } = (await getAccessToken()) ?? {};
  if (user) {
    return {
      data: user,
    };
  }
  const { url } = AUTH_API.SESSION;
  const result = await api.get<Result<UserDto>>({ url });
  if (result?.data?.id) {
    return result;
  }
  return null;
});

export type SignInUserResult = Awaited<ReturnType<typeof signInUser>>;

export type SignUpUserResult = Awaited<ReturnType<typeof signUpUser>>;

export type SignoutUserResult = Awaited<ReturnType<typeof signOutUser>>;
