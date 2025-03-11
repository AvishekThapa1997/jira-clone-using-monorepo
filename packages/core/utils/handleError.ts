import { ErrorResult } from '../types';

export class OperationalError extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
  }
}

export const handleError = (err: unknown): ErrorResult => {
  if (err instanceof Error) {
    // if (err instanceof StorageError) {
    //   switch (err.code) {
    //     case StorageErrorCode.SERVER_FILE_WRONG_SIZE: {
    //       return {
    //         message: 'File is too large',
    //       };
    //     }
    //   }
    // } else if (err instanceof FirestoreError) {
    // } else {
    //   switch (err.code) {
    //     case AuthErrorCodes.WEAK_PASSWORD: {
    //       break;
    //     }
    //     case AuthErrorCodes.EMAIL_EXISTS: {
    //       break;
    //     }
    //     default:
    //       return {
    //         message: err.message,
    //       };
    //   }
    // }
    return {
      message: err.message,
    };
  } else if (err instanceof OperationalError || err instanceof Error) {
    return {
      message: err.message,
    };
  }
  return {
    message: 'Something went wrong',
  };
};
