import { signOut } from 'firebase/auth';
import {
  createContext,
  PropsWithChildren,
  useActionState,
  useMemo,
} from 'react';
import { auth } from '../../../config/firebase';
import { Result, UserDto, ValidationError } from '../../../types/types';
import { signInAction, signUpAction } from '../action';
import { SignUpSchema } from '../types';

interface AuthAction<Data> {
  operation: (payload: FormData) => void;
  data: Data;
  isPending: boolean;
}

type AuthContext = {
  signOut: () => ReturnType<typeof signOut>;
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
  const signOutUser = () => {
    return signOut(auth);
  };
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
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthServiceProvider };
