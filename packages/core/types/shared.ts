export interface UserDto {
  id: string;
  email: string;
  name: string;
}

export interface ErrorResult<T = any> {
  code?: number;
  message: string;
  validationErrors?: ValidationError<T>;
}

export type ValidationError<T> = {
  [Key in keyof T]: {
    message: string;
  };
};

export interface Result<Data, ValidationErrorSchema = any> {
  data?: Data;
  error?: ErrorResult<ValidationErrorSchema>;
}

export interface BaseProps {
  className?: string;
}

export interface BaseQueryResult<ID extends string | number | symbol, Data> {
  allIds: ID[];
  data: Record<ID, Data>;
}
