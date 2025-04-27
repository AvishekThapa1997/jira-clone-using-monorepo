import type {
  CreateWorkspaceSchema,
  OnFormSubmitOptions,
  Result,
  ValidationError,
  WorkspaceDto,
} from '@jira-clone/core/types';
import { ComponentProps, FormEvent } from 'react';

export type HandleWorkspaceFormSubmit = (
  event: FormEvent<HTMLFormElement>,
  options?: OnFormSubmitOptions<Result<WorkspaceDto>>,
) => void;

export type WorkspaceFormProps = {
  handleCancel?: () => void;
  selectedWorkspace?: WorkspaceDto;
  onWorkspaceCreated?: (workspace: WorkspaceDto) => void;
  handleSubmit: HandleWorkspaceFormSubmit;
  errors?: ValidationError<CreateWorkspaceSchema>;
  isSubmitting?: boolean;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

export type CreateWorkspaceFormProps = Omit<WorkspaceFormProps, 'handleSubmit'>;
