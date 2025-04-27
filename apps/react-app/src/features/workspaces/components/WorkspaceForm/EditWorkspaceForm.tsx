import type { CreateWorkspaceFormProps } from '../../types';
import { WorkspaceForm } from './WorkspaceForm';

const EditWorkspaceForm = ({
  selectedWorkspace,
  ...props
}: CreateWorkspaceFormProps) => {
  return (
    <WorkspaceForm
      key={selectedWorkspace.id}
      selectedWorkspace={selectedWorkspace}
      handleSubmit={(event) => {}}
      {...props}
    />
  );
};

export { EditWorkspaceForm };
