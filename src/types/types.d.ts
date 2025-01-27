export interface UserDto {
  id: string;
  email: string;
  name: string;
}

export type SignUpUserArg = Pick<UserDto, 'email' | 'name'> & {
  password: string;
};

export type SignInUserArg = Pick<UserDto, 'email'> & { password: string };

export interface ErrorResult<T = any> {
  code: number;
  message: string;
  validationErrors?: T;
}

export type ValidationError<T> = {
  [Key in keyof T]: {
    message: string;
  };
};

export interface Result<Data> {
  data?: Data;
  error?: ErrorResult;
}
