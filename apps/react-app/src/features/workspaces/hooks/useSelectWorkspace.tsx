import { useContext } from 'react';
import { SelectWorkspaceContext } from '../provider/SelectWorkspaceProvider';

export const useSelectWorkspace = () => {
  const result = useContext(SelectWorkspaceContext);
  if (!result) {
    throw new Error(
      'useSelectWorkspace must be used within SelectWorkspaceProvider',
    );
  }
  return result;
};
