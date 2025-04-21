export type ErrorResult<T = any> = {
  code: number;
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
