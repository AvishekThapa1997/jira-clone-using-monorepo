import * as zod from "zod";
import { createWorkspaceSchema } from "../schema/workspace.js";
import { BaseQueryResult } from "./shared.js";

export type CreateWorkspaceSchema = zod.infer<typeof createWorkspaceSchema>;

export enum WorkspaceMemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export type WorkspaceDto = {
  id: string;
  name: string;
  imageUrl?: string;
  createdAt: any;
  creatorId: string;
  updatedAt: any;
  members?: string[];
};

export type WorkspaceMemberDto = {
  workspaceDetails: Pick<WorkspaceDto, "id" | "name" | "imageUrl">;
  memberName: string;
  emailId: string;
  memberId: string;
  role: WorkspaceMemberRole;
};

export type WorkspaceEvent = {
  data?: WorkspaceDto;
};

export type UseNewWorkspaceSubscriberOptions = {
  onWorkspaceCreated: (event: WorkspaceEvent) => void;
};

export type UseWorkspaceSelectedEventSubscriberOptions = {
  onWorkspaceSelected: (event: WorkspaceEvent) => void;
};

export type WorkspaceQueryResult = BaseQueryResult<string, WorkspaceDto>;
