import {
  type FirestoreDataConverter,
  type WithFieldValue,
} from 'firebase/firestore';
import { CreateWorkspaceSchema } from '../types';

export interface WorkspaceDto {
  id: string;
  name: string;
  imageUrl?: string;
  createdAt: string;
  creatorId: string;
  updatedAt: string;
  members?: string[];
}

export const workspaceConverter: FirestoreDataConverter<
  WorkspaceDto,
  CreateWorkspaceSchema
> = {
  toFirestore(options: WithFieldValue<WorkspaceDto>) {
    return {
      name: options.name,
      creatorId: options.creatorId,
      imageUrl: options.imageUrl ?? '',
      members: options.members,
      createdAt: options.createdAt,
      updatedAt: options.updatedAt,
    };
  },
  fromFirestore(snapshot, options): WorkspaceDto {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data?.name,
      imageUrl: data?.imageUrl,
      createdAt: (data?.createdAt?.toDate() as Date)?.toISOString(),
      updatedAt: (data?.updatedAt?.toDate() as Date)?.toISOString(),
      creatorId: data?.creatorId,
      members: data?.members,
    };
  },
};
