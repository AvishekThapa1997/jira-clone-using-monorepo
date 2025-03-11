import type {
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';
import type {
  WorkspaceDto,
  CreateWorkspaceSchema,
} from '@jira-clone/core/types';

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
