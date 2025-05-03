export type ErrorResult<T = any> = {
  code?: number;
  message: string;
  validationErrors?: ValidationError<T>;
};

export type ValidationError<T> = {
  [Key in keyof T]: {
    message: string;
  };
};

export type Result<Data, ValidationErrorSchema = any> = {
  data?: Data;
  error?: ErrorResult<ValidationErrorSchema>;
};

export type BaseProps = {
  className?: string;
};

export type BaseQueryResult<ID extends string | number | symbol, Data> = {
  allIds: ID[];
  data: Record<ID, Data>;
};

export type OnFormSubmitOptions<T> = {
  onSuccess?: (data: T) => void;
  onSubmit?: (data: T) => void;
  onFail?: (error: Error) => void;
};

export type FormInput<T> = {
  value?: T;
};

export type FetchUrl = string | URL | Request;
export type FetchRequest<RequestBody = any> = Omit<RequestInit, "body"> & {
  body?: RequestBody;
};
export type TryCatchOptions = {
  throwOnError: boolean;
  finally?: () => void;
};

export type ResponseType = keyof Pick<
  Response,
  "arrayBuffer" | "blob" | "json" | "text"
>;

export type ParseSchemaResult<Schema> = {
  data?: Schema;
  errors?: ValidationError<Schema>;
};

export type InitRequestOptions = {
  method: ApiMethod;
  requestConfig?: FetchRequest;
  additionalHeaders: Record<string, string>;
};

export type ApiMethod = "GET" | "POST";

export type ApiOptions<RequestBody> = {
  url: FetchUrl;
  method: ApiMethod;
  requestConfig?: FetchRequest<RequestBody>;
  requireAuth?: boolean;
  responseType?: ResponseType;
};

export type ApiOptionsWithoutMethod<RequestBody> = Omit<
  ApiOptions<RequestBody>,
  "method"
>;
