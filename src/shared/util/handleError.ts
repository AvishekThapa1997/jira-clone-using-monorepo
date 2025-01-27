import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';
import { ErrorResult } from '../../types/types';

export const handleError = (err: unknown): ErrorResult => {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case AuthErrorCodes.WEAK_PASSWORD: {
        break;
      }
      case AuthErrorCodes.EMAIL_EXISTS: {
        break;
      }
      default:
        return {
          message: 'Something went wrong',
          code: 500,
        };
    }
  }
  return {
    message: 'Something went wrong',
    code: 500,
  };
};
