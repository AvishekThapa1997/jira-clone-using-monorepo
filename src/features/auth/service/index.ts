import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { handleError } from '../../../shared/util/handleError';
import {
  Result,
  SignInUserArg,
  SignUpUserArg,
  UserDto,
} from '../../../types/types';
import { auth } from '../../../config/firebase';

export const signUpUser = async ({
  email,
  name,
  password,
}: SignUpUserArg): Promise<Result<UserDto>> => {
  try {
    // use zod parse for validation
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    await updateProfile(user, {
      displayName: name,
    });
    return {
      data: {
        id: user.uid,
        email,
        name,
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
}: SignInUserArg): Promise<Result<UserDto>> => {
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
