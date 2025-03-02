import * as zod from 'zod';
import { WORKSPACE_CONSTANTS, WORKSPACE_ERROR_MESSAGES } from '../constants';

export const createWorkspaceSchema = zod.object({
  name: zod
    .string({
      message: WORKSPACE_ERROR_MESSAGES.WORKSPACE_NAME_MIN_LENGTH_REQUIRED,
    })
    .trim()
    .min(WORKSPACE_CONSTANTS.WORKSPACE_MIN_LENGTH, {
      message: WORKSPACE_ERROR_MESSAGES.WORKSPACE_NAME_MIN_LENGTH_REQUIRED,
    }),
  imageUrl: zod.string().url().optional(),
  creatorId: zod.string().optional(),
  createdAt: zod.any().optional(),
  updatedAt: zod.any().optional(),
  adminMembers: zod.array(zod.string()).optional(),
});
