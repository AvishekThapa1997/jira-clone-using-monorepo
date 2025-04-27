import { useActionState } from 'react';
import { signInAction } from '../action';

export const useUserSignIn = () => {
  const [signInData, action, isPending] = useActionState(signInAction, {});
  return { signInData, action, isPending };
};
