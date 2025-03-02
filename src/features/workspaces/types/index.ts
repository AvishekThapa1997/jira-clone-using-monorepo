import * as zod from 'zod';
import { createWorkspaceSchema } from '../schema';

export type CreateWorkspaceSchema = zod.infer<typeof createWorkspaceSchema>;

export enum WorkspaceMemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}
