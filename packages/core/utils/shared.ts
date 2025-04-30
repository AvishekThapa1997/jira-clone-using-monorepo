import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";
import {
  AuthResult,
  ErrorResult,
  Result,
  ValidationError,
} from "../types/index.js";
import { AUTH_API, CONSTANTS } from "../constants/auth.js";
type FetchUrl = string | URL | Request;
type FetchRequest<RequestBody = any> = Omit<RequestInit, "body"> & {
  body?: RequestBody;
};
type TryCatchOptions = {
  throwOnError: boolean;
  finally?: () => void;
};

type ResponseType = keyof Pick<
  Response,
  "arrayBuffer" | "blob" | "json" | "text"
>;

type ParseSchemaResult<Schema> = {
  data?: Schema;
  errors?: ValidationError<Schema>;
};
const initHeaders = (requestConfig?: FetchRequest): Headers => {
  const headers = new Headers();
  const headerValues = Object.entries(requestConfig?.headers ?? {});
  if (headerValues.length > 0) {
    headerValues.forEach(([key, value]) => {
      headers.append(key, value);
    });
  }
  return headers;
};

const stringifyRequestBody = (requestConfig?: FetchRequest) => {
  if (requestConfig?.body) {
    return JSON.stringify(requestConfig?.body);
  }
};

export const publicFetch = async <ResponseResult = any, RequestBody = any>(
  url: FetchUrl,
  requestConfig?: FetchRequest<RequestBody>,
  responseType: ResponseType = "json"
): Promise<ResponseResult> => {
  const response = await fetch(url, {
    headers: initHeaders(requestConfig),
    ...(requestConfig ?? {}),
    body: stringifyRequestBody(requestConfig),
  });
  const result = response[responseType]();
  return result;
};

export const privateFetch = async <ResponseResult = any, RequestBody = any>(
  url: FetchUrl,
  requestConfig: FetchRequest<RequestBody>,
  responseType: ResponseType = "json"
): Promise<ResponseResult | undefined> => {
  const result = await getAccessToken(); // create a function that will check access token expiration from local storage if threshold is 5 min then refresh,access token will be stored in cookie only
  const { token } = result ?? {};
  const bearerToken = `Bearer ${token}`;
  const response = await fetch(url, {
    ...requestConfig,
    headers: { ...initHeaders(requestConfig), Authorization: bearerToken },
    body: stringifyRequestBody(requestConfig),
  });
  return response[responseType]();
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const tryCatch = <F extends (...args: any) => any>(
  operation: F,
  options: TryCatchOptions = { throwOnError: false, finally: () => {} }
) => {
  return async (
    ...args: Parameters<F>
  ): Promise<Awaited<ReturnType<F>> | undefined> => {
    try {
      return operation(...args);
    } catch (err) {
      console.error("Error " + err);
      if (options?.throwOnError) {
        throw err;
      }
    } finally {
      if (options.finally) {
        options?.finally();
      }
    }
  };
};

export const parseSchema = <Schema = ZodSchema>(
  schema: ZodSchema<Schema>,
  data: Partial<Schema>
): ParseSchemaResult<Schema> => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { data: result.data };
  }
  const fieldErrors = result.error.flatten().fieldErrors as any;
  const errors: ValidationError<Schema> = Object.entries<string[]>(
    fieldErrors
  ).reduce(
    (cumm, [key, value]) => {
      return {
        ...cumm,
        [key]: {
          message: value[0],
        },
      };
    },
    {} as ValidationError<Schema> // Type assertion for initial value
  );

  return {
    errors,
  };
};

/**
 * Stores the access token and its expiration time in the browser's local storage.
 *
 * @param accessToken - The access token to be stored.
 * @param expireAt - The expiration time of the access token in ISO 8601 format.
 
 */
export const setTokenDetailsInLocalStorage = (
  accessToken: string,
  expireAt: string
) => {
  localStorage.setItem(
    CONSTANTS.ACCESS_TOKEN_EXPIRATION_KEY,
    JSON.stringify({ accessToken, expireAt })
  );
};

/**
 * Retrieves the existing access token from local storage if it is still valid.
 *
 * The token is considered valid if it is not going to expire within the next 5 minutes.
 * If the token is expired or about to expire, `null` is returned.
 *
 * @returns {string | null} The valid access token, or `null` if no valid token exists.
 */
const getExistingToken = (): string | null => {
  const _existingTokeDetails = localStorage.getItem(
    CONSTANTS.ACCESS_TOKEN_EXPIRATION_KEY
  );
  if (!_existingTokeDetails) {
    return null;
  }
  const existingTokenDetail = JSON.parse(_existingTokeDetails) as Pick<
    AuthResult,
    "accessToken" | "expireAt"
  >;
  const tokenExpirationTime = new Date(existingTokenDetail.expireAt).getTime();
  const diff = Math.abs(tokenExpirationTime - Date.now());
  if (diff > CONSTANTS.ACCESS_TOKEN_EXPIRATION_THRESHOLD) {
    return existingTokenDetail.accessToken;
  }
  return null;
};

/**
 * Retrieves the access token, either from existing storage or by refreshing it.
 *
 * @param forceRefresh - A boolean indicating whether to force a token refresh.
 *                       Defaults to `false`. If `true`, the token will be refreshed
 *                       regardless of whether an existing token is available.
 * @returns A promise that resolves to the access token as a string, or `null` if
 *          the token could not be retrieved.
 *
 */
export const getAccessToken = tryCatch(
  async (forceRefresh: boolean = false) => {
    const existingToken = getExistingToken();
    if (existingToken && !forceRefresh) {
      return { token: existingToken };
    } else {
      const { url } = AUTH_API.REFRESH_TOKEN;
      const result = await publicFetch<Result<AuthResult>>(url, {
        credentials: "include",
      });
      if (!result?.data) {
        throw new Error("Session expired");
      }
      const { accessToken, expireAt, user } = result.data;
      setTokenDetailsInLocalStorage(accessToken, expireAt);
      return { token: accessToken, expireAt, user };
    }
  },
  {
    throwOnError: true,
  }
);

export const handleError = (err: unknown): ErrorResult => {
  if (err instanceof Error) {
    return {
      message: err.message,
    };
  }
  return {
    message: "Something went wrong",
  };
};
