import { ActionFunctionArgs } from 'react-router';
import { signInUser, signUpUser } from '../service';

export const signUpAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const { data, error } = await signUpUser({
    email,
    name,
    password,
  });
  if (data?.id) {
    window.location.href = '/dashboard';
    return;
  }
  return error;
};

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const { data, error } = await signInUser({
    email,
    password,
  });
  if (data?.id) {
    window.location.href = '/dashboard';
    return;
  }
  return error;
};

export type SignUpAction = typeof signUpAction;
export type SignInAction = typeof signInAction;
