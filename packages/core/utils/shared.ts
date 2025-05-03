import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";
import { AUTH_API, CONSTANTS } from "../constants/auth.js";
import type {
  ApiOptions,
  ApiOptionsWithoutMethod,
  AuthResult,
  ErrorResult,
  FetchRequest,
  InitRequestOptions,
  ParseSchemaResult,
  Result,
  TryCatchOptions,
  ValidationError,
} from "../types/index.js";

/**
 * Initializes and returns a `Headers` object populated with the headers
 * provided in the optional `requestConfig` parameter.
 *
 * @param requestConfig - An optional configuration object of type `FetchRequest`
 * containing a `headers` property. The `headers` property should be an object
 * where keys are header names and values are header values.
 *
 * @returns A `Headers` object containing the headers from the `requestConfig`.
 */
const initHeaders = (requestConfig?: FetchRequest): Record<string, string> => {
  const headers: Record<string, string> = {};
  Object.entries(requestConfig?.headers ?? {}).reduce<Record<string, string>>(
    (cumm, curr) => {
      const [key, val] = curr;
      cumm[key] = val;
      return cumm;
    },
    headers
  );
  return headers;
};

/**
 * Converts the `body` property of a `FetchRequest` object into a JSON string.
 *
 * @param requestConfig - An optional `FetchRequest` object containing the request configuration.
 * @returns A JSON string representation of the `body` property if it exists, otherwise `undefined`.
 */
const stringifyRequestBody = (requestConfig?: FetchRequest) => {
  if (requestConfig?.body) {
    return JSON.stringify(requestConfig?.body);
  }
};

const _fetch: typeof fetch = (...args) => {
  return fetch(...args);
};

/**
 * Initializes a request configuration object by merging provided options
 * with default headers and request body formatting.
 *
 * @param {InitRequestOptions} options - The options for initializing the request.
 * @param {string} options.method - The HTTP method to use for the request (e.g., 'GET', 'POST').
 * @param {Record<string, string>} options.additionalHeaders - Additional headers to include in the request.
 * @param {RequestConfig} [options.requestConfig] - Optional base configuration for the request.
 *
 * @returns {RequestConfig | {}} The initialized request configuration object, or an empty object if no configuration is provided.
 */
const initRequest = ({
  method,
  additionalHeaders,
  requestConfig,
}: InitRequestOptions) => {
  if (requestConfig) {
    return {
      ...requestConfig,
      headers: { ...initHeaders(requestConfig), ...additionalHeaders },
      body: stringifyRequestBody(requestConfig),
      method,
    };
  }
  return {};
};

/**
 * Generates an authorization header for HTTP requests.
 *
 * @param requireAuth - A boolean indicating whether authentication is required. Defaults to `true`.
 * @returns A promise that resolves to an object containing the `Authorization` header if authentication is required and a token is available, or an empty object otherwise.
 *
 * @example
 * // Usage when authentication is required
 * const header = await getAuthorizationHeader(true);
 * console.log(header); // { Authorization: 'Bearer <token>' }
 *
 * @example
 * // Usage when authentication is not required
 * const header = await getAuthorizationHeader(false);
 * console.log(header); // {}
 */
const getAuthorizationHeader = async (
  requireAuth: boolean = true
): Promise<Record<string, string>> => {
  if (requireAuth) {
    const result = await getAccessToken();
    const { token } = result ?? {};
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
};

/**
 * Makes an HTTP request with the specified options and returns the response in the desired format.
 *
 * @template RequestBody - The type of the request body.
 * @param {ApiOptions<RequestBody>} options - The options for the API request.
 * @param {string} options.url - The URL to which the request is sent.
 * @param {string} options.method - The HTTP method to use for the request (e.g., GET, POST).
 * @param {boolean} options.requireAuth - Indicates whether the request requires authentication.
 * @param {RequestInit} [options.requestConfig] - Additional configuration for the request, such as headers or body.
 * @param {keyof Response} options.responseType - The type of response to return (e.g., "json", "text").
 * @returns {Promise<any>} A promise that resolves to the response in the specified format.
 * @throws {Error} Throws an error if the request fails or if the response cannot be processed.
 */
const makeRequest = async <ResponseResult, RequestBody>({
  url,
  method,
  requireAuth,
  requestConfig,
  responseType,
}: Required<ApiOptions<RequestBody>>) => {
  const authHeaders = await getAuthorizationHeader(requireAuth);
  const req = initRequest({
    method,
    requestConfig,
    additionalHeaders: authHeaders,
  });
  const response = await _fetch(url, req);
  return response[responseType]() as ResponseResult;
};

/**
 * A utility object for making API requests with predefined methods.
 */
export const api = {
  /**
   * Sends a GET request to the specified URL.
   *
   * @template RequestBody - The type of the request body.
   * @param {ApiOptionsWithoutMethod<RequestBody>} options - The options for the GET request.
   * @param {string} options.url - The URL to send the request to.
   * @param {object} [options.requestConfig] - Additional configuration for the request.
   * @param {boolean} [options.requireAuth=true] - Whether the request requires authentication.
   * @param {string} [options.responseType="json"] - The expected response type.
   * @returns {Promise<any>} A promise that resolves with the response data.
   */
  get: <ResponseResult, RequestBody = any>({
    url,
    requestConfig = {},
    requireAuth = true,
    responseType = "json",
  }: ApiOptionsWithoutMethod<RequestBody>) => {
    return makeRequest<ResponseResult, RequestBody>({
      url,
      method: "GET",
      requireAuth,
      requestConfig,
      responseType,
    });
  },

  /**
   * Sends a POST request to the specified URL.
   *
   * @template RequestBody - The type of the request body.
   * @param {ApiOptionsWithoutMethod<RequestBody>} options - The options for the POST request.
   * @param {string} options.url - The URL to send the request to.
   * @param {object} [options.requestConfig] - Additional configuration for the request.
   * @param {boolean} [options.requireAuth=true] - Whether the request requires authentication.
   * @param {string} [options.responseType="json"] - The expected response type.
   * @returns {Promise<any>} A promise that resolves with the response data.
   */
  post: <ResponseResult, RequestBody = any>({
    url,
    requestConfig = {},
    requireAuth = true,
    responseType = "json",
  }: ApiOptionsWithoutMethod<RequestBody>): Promise<ResponseResult> => {
    return makeRequest<ResponseResult, RequestBody>({
      url,
      method: "POST",
      requireAuth,
      requestConfig,
      responseType,
    });
  },
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
      const result = await api.get<Result<AuthResult>>({ url });
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
