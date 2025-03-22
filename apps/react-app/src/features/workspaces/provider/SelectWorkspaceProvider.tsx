import { WorkspaceDto } from '@jira-clone/core/types';
import { createContext, PropsWithChildren, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router';

type SelectedWorkspace = {
  selectedWorkspace?: WorkspaceDto;
  selectWorkspace: (workspace?: WorkspaceDto) => void;
};

const SelectWorkspaceContext = createContext<SelectedWorkspace | null>(null);

const SelectWorkspaceProvider = ({ children }: PropsWithChildren) => {
  const [selectedWorkspace, setWorkspace] = useState<
    WorkspaceDto | undefined
  >();
  const navigate = useNavigate();
  const selectWorkspace = (workspace: WorkspaceDto) => {
    setWorkspace(workspace);
    navigate(`/dashboard/workspaces/${workspace.id}`);
  };
  return (
    <SelectWorkspaceContext.Provider
      value={{
        selectWorkspace,
        selectedWorkspace,
      }}
    >
      {children}
    </SelectWorkspaceContext.Provider>
  );
};

export { SelectWorkspaceProvider, SelectWorkspaceContext };
