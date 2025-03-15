import { getFunctions } from '@jira-clone/firebase/functions';
import { getAuth } from '@jira-clone/firebase/auth';
import { parseSchema, handleError } from '@jira-clone/core/utils';
import { signUpSchema } from '@jira-clone/core/schema/auth';
import type {
  SignInSchema,
  SignUpSchema,
  Result,
  UserDto,
} from '@jira-clone/core/types';
export const signUpUser = async ({
  email,
  name,
  password,
}: SignUpSchema): Promise<Result<UserDto>> => {
  try {
    const parsedResult = parseSchema(signUpSchema, { email, name, password });
    if (parsedResult.data) {
      const { firebaseFunction, httpsCallable } = await getFunctions();
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
    const { signInWithEmailAndPassword, auth } = await getAuth();
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
    const { auth, signOut } = await getAuth();
    await signOut(auth);
    return {};
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
};
