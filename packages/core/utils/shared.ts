import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodSchema } from "zod";
import { ErrorResult, ValidationError } from "../types/index.js";
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
    credentials: "omit",
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
): Promise<ResponseResult> => {
  // need to fetch token

  const token = ""; // create a function that will check access token expiration from local storage if threshold is 5 min then refresh,access token will be stored in cookie only
  const bearerToken = `Bearer ${token}`;
  const response = await fetch(url, {
    ...requestConfig,
    headers: { ...initHeaders(requestConfig), Authorization: bearerToken },
    credentials: "include",
    body: stringifyRequestBody(requestConfig),
  });
  const result = response[responseType]();
  return result;
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

export class OperationalError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(message);
  }
}

export const handleError = (err: unknown): ErrorResult => {
  if (err instanceof Error) {
    return {
      code: 0,
      message: err.message,
    };
  } else if (err instanceof OperationalError || err instanceof Error) {
    return {
      code: 0,
      message: err.message,
    };
  }
  return {
    code: 0,
    message: "Something went wrong",
  };
};
