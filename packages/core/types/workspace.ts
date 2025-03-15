import * as zod from 'zod';
import { createWorkspaceSchema } from '../schema/workspace';

export type CreateWorkspaceSchema = zod.infer<typeof createWorkspaceSchema>;

export enum WorkspaceMemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export interface WorkspaceDto {
  id: string;
  name: string;
  imageUrl?: string;
  createdAt: string;
  creatorId: string;
  updatedAt: string;
  members?: string[];
}

export interface WorkspaceMemberDto {
  workspaceDetails: Pick<WorkspaceDto, 'id' | 'name' | 'imageUrl'>;
  memberName: string;
  emailId: string;
  memberId: string;
  role: WorkspaceMemberRole;
}
