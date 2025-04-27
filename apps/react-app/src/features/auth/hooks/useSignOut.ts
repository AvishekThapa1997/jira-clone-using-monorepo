import { useMutation } from '@tanstack/react-query';
import { signOutUser } from '../service';

export const useSignOut = () => {
  return useMutation({
    mutationKey: ['user-signout'],
    mutationFn: () => signOutUser(),
    onSuccess() {
      window.location.href = '/auth/sign-in';
    },
  });
};
