import { useActionState } from 'react';
import { signUpAction } from '../action';

export const useUserSignUp = () => {
  const [signUpData, action, isPending] = useActionState(signUpAction, {});
  return { signUpData, action, isPending };
};
