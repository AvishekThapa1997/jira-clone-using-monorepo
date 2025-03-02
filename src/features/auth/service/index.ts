import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, getFunctions } from '../../../config/firebase';
import { handleError } from '../../../shared/util/handleError';
import { Result, UserDto } from '../../../types/types';

import { parseSchema } from '@/shared/util/parseSchema';
import { signUpSchema } from '../schema';
import { SignInSchema, SignUpSchema } from '../types';

export const signUpUser = async ({
  email,
  name,
  password,
}: SignUpSchema): Promise<Result<UserDto>> => {
  try {
    const parsedResult = parseSchema(signUpSchema, { email, name, password });
    if (parsedResult.data) {
      const { httpsCallable, firebaseFunction } = await getFunctions();
      const _signUpUser = httpsCallable<SignUpSchema, UserDto>(
        firebaseFunction,
        'signUpUser',
      );
      const userCallable = await _signUpUser({
        ...parsedResult.data,
      });
      const user = userCallable.data;
      if (user) {
        return signInUser({ email, password });
      }
    }
    return {
      error: {
        code: 400,
        message: 'ValidationError',
        validationErrors: parsedResult.errors,
      },
    };
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
};

export const signInUser = async ({
  email,
  password,
}: SignInSchema): Promise<Result<UserDto>> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    return {
      data: {
        email: user.email ?? '',
        id: user.uid,
        name: user.displayName ?? '',
      },
    };
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
};

export const signOutUser = async (): Promise<Result<void>> => {
  try {
    await signOut(auth);
    return {};
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
};
