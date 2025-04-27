import type {
  FormInput,
  Result,
  SignInSchema,
  SignUpSchema,
  UserDto,
  ValidationError,
} from '@jira-clone/core/types';
import {
  signInUser,
  type SignInUserResult,
  signUpUser,
  type SignUpUserResult,
} from '../service';

export const signUpAction = async (
  state: SignUpActionState,
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
    state.value = {
      email,
      name,
      password,
    };
  }
  return state;
};

export const signInAction = async (
  state: SignInActionState,
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
    state.value = {
      email,
      password: '',
    };
  }
  return state;
};

export type SignUpAction = typeof signUpAction;
export type SignUpActionState = SignUpUserResult & FormInput<SignUpSchema>;
export type SignInAction = typeof signInAction;
export type SignInActionState = SignInUserResult & FormInput<SignInSchema>;
