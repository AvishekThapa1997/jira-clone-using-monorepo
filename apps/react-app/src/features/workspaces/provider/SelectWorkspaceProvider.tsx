import { WORKSPACE_CONSTANTS } from '@jira-clone/core/constants/workspace';
import { WorkspaceDto } from '@jira-clone/core/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router';

type SelectedWorkspace = {
  selectedWorkspace?: WorkspaceDto;
  selectWorkspace: (workspace?: WorkspaceDto) => void;
};

const SelectWorkspaceContext = createContext<SelectedWorkspace | null>(null);

const SelectWorkspaceProvider = ({ children }: PropsWithChildren) => {
  const [lastSelectedWorkspace, setLastSelectedWorkspaceInStorage] =
    useLocalStorage<WorkspaceDto>(
      WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
    );
  const [selectedWorkspace, setWorkspace] = useState<WorkspaceDto | undefined>(
    lastSelectedWorkspace,
  );
  const navigate = useNavigate();
  const selectWorkspace = (workspace: WorkspaceDto) => {
    setWorkspace(workspace);
    setLastSelectedWorkspaceInStorage(workspace);
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
