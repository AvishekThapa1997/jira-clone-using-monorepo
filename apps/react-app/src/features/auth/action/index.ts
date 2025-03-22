import type {
  UserDto,
  Result,
  ValidationError,
  SignUpSchema,
} from '@jira-clone/core/types';
import { signInUser, signUpUser } from '../service';

export const signUpAction = async (
  state: Result<UserDto, ValidationError<SignUpSchema>>,
  formData: FormData,
): Promise<Result<UserDto, ValidationError<SignUpSchema>>> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const { data, error } = await signUpUser({
    email,
    name,
    password,
  });
  if (data?.id) {
    state.data = data;
  }
  if (error) {
    state.error = {
      ...error,
      validationErrors: error.validationErrors
        ? (error.validationErrors satisfies ValidationError<SignUpSchema>)
        : undefined,
    };
  }
  return state;
};

export const signInAction = async (
  state: Result<UserDto>,
  formData: FormData,
) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const { data, error } = await signInUser({
    email,
    password,
  });
  if (data?.id) {
    state.data = data;
  }
  if (error) {
    state.error = error;
  }
  return state;
};

export type SignUpAction = typeof signUpAction;
export type SignInAction = typeof signInAction;
