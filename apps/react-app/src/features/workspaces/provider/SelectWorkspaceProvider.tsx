import { WORKSPACE_CONSTANTS } from '@jira-clone/core/constants/workspace';
import { WorkspaceDto } from '@jira-clone/core/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router';
import { useGetWorkspaceByIdFromCache } from '../hooks/useGetWorkspaceByIdFromCache';

type SelectedWorkspace = {
  selectedWorkspace?: WorkspaceDto;
  selectWorkspace: (workspace?: WorkspaceDto) => void;
};

const SelectWorkspaceContext = createContext<SelectedWorkspace>({
  selectedWorkspace: undefined,
  selectWorkspace: () => {
    throw new Error(
      'selectWorkspace must be used within a SelectWorkspaceProvider',
    );
  },
});

/**
 * A provider component that manages the selection of a workspace and provides
 * the selected workspace context to its children. It handles workspace selection
 * logic, including persisting the last selected workspace in local storage and
 * synchronizing the selected workspace with the URL search parameters.
 *
 * @param {PropsWithChildren} props - The props for the provider component, including children.
 *
 * @returns {JSX.Element} A context provider that supplies the selected workspace
 * and a function to select a workspace to its children.
 *
 * @remarks
 * - This component uses `useLocalStorage` to persist the last selected workspace.
 * - It uses `useSearchParams` to manage the workspace ID in the URL.
 * - The `useEffect` hook ensures that the selected workspace is synchronized with
 *   the URL and local storage.
 *
 * @context {SelectWorkspaceContext} Provides the following values:
 * - `selectWorkspace`: A function to select a workspace.
 * - `selectedWorkspace`: The currently selected workspace.
 *
 * @example
 * ```tsx
 * <SelectWorkspaceProvider>
 *   <YourComponent />
 * </SelectWorkspaceProvider>
 * ```
 */
const SelectWorkspaceProvider = ({ children }: PropsWithChildren) => {
  const [lastSelectedWorkspace, setLastSelectedWorkspaceInStorage] =
    useLocalStorage<WorkspaceDto>(
      WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
    );

  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceNameFromUrl = searchParams.get('workspace');
  const getWorkspaceById = useGetWorkspaceByIdFromCache(workspaceNameFromUrl);

  const isLastSelectedWorkspaceIdSameAsWorkspaceIdFromUrl = Boolean(
    workspaceNameFromUrl &&
      workspaceNameFromUrl === lastSelectedWorkspace?.name,
  );

  const [selectedWorkspace, setWorkspace] = useState<WorkspaceDto | undefined>(
    () => {
      if (
        isLastSelectedWorkspaceIdSameAsWorkspaceIdFromUrl ||
        !workspaceNameFromUrl
      ) {
        return lastSelectedWorkspace;
      }
      return getWorkspaceById();
    },
  );

  console.log({ selectedWorkspace });

  useSyncWorkspaceWithStorageAndUrl(
    selectedWorkspace,
    isLastSelectedWorkspaceIdSameAsWorkspaceIdFromUrl,
  );

  const selectWorkspace = useCallback(
    (workspace: WorkspaceDto) => {
      setWorkspace(workspace);
      setLastSelectedWorkspaceInStorage(workspace);
      setSearchParams({
        workspace: workspace.name,
      });
    },
    [setLastSelectedWorkspaceInStorage, setSearchParams],
  );

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

/**
 * Synchronizes the selected workspace with both local storage and the URL search parameters.
 *
 * This hook ensures that the selected workspace is stored in local storage and reflected in the URL
 * search parameters when the component mounts. It only runs once due to the empty dependency array.
 *
 * @param selectedWorkspace - The currently selected workspace, or `undefined` if no workspace is selected.
 * @param isLastSelectedWorkspaceIdSameAsWorkspaceIdFromUrl - A boolean indicating whether the last selected
 * workspace ID in local storage matches the workspace ID from the URL.
 *
 * @remarks
 * - If the `selectedWorkspace` has an ID and it does not match the last selected workspace ID from the URL,
 *   the workspace is saved to local storage.
 * - If the `selectedWorkspace` has an ID, the workspace ID is also set in the URL search parameters.
 * - The effect is intentionally designed to run only once when the component mounts.
 */
const useSyncWorkspaceWithStorageAndUrl = (
  selectedWorkspace: WorkspaceDto | undefined,
  isLastSelectedWorkspaceIdSameAsWorkspaceIdFromUrl: boolean,
) => {
  const [, setLastSelectedWorkspaceInStorage] = useLocalStorage<WorkspaceDto>(
    WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
  );

  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (
      selectedWorkspace?.id &&
      !isLastSelectedWorkspaceIdSameAsWorkspaceIdFromUrl
    ) {
      setLastSelectedWorkspaceInStorage(selectedWorkspace);
    }
    if (selectedWorkspace?.id) {
      setSearchParams({
        workspace: selectedWorkspace.name,
      });
    }
    // This effect should only run once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { SelectWorkspaceContext, SelectWorkspaceProvider };
