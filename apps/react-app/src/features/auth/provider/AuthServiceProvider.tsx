import {
  createContext,
  PropsWithChildren,
  useActionState,
  useMemo,
} from 'react';

import type {
  Result,
  UserDto,
  ValidationError,
  SignUpSchema,
} from '@jira-clone/core/types';
import { signInAction, signUpAction } from '../action';

interface AuthAction<Data> {
  operation: (payload: FormData) => void;
  data: Data;
  isPending: boolean;
}

type AuthContext = {
  //signOut: () => ReturnType<typeof signOut>;
  isAuthInProgress: boolean;
  signUpAction: AuthAction<Result<UserDto, ValidationError<SignUpSchema>>>;
  signInAction: AuthAction<Result<UserDto>>;
};

export const AuthContext = createContext<AuthContext | null>(null);

const AuthServiceProvider = ({ children }: PropsWithChildren) => {
  const [signUpData, _signUpAction, isSignUpInProgress] = useActionState(
    signUpAction,
    {},
  );
  const [signInData, _signInAction, isSignInProgress] = useActionState(
    signInAction,
    {},
  );
  // const signOutUser = () => {
  //   //return signOut(auth);
  // };
  const isAuthInProgress = useMemo(
    () => isSignInProgress || isSignUpInProgress,
    [isSignInProgress, isSignUpInProgress],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthInProgress,
        signInAction: {
          operation: _signInAction,
          data: signInData,
          isPending: isSignInProgress,
        },
        signUpAction: {
          operation: _signUpAction,
          data: signUpData,
          isPending: isSignUpInProgress,
        },
        //signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthServiceProvider };
