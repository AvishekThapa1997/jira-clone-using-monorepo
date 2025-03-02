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
