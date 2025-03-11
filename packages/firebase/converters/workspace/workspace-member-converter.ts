import type {
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';
import type { WorkspaceMemberDto } from '@jira-clone/core/types';
export const workspaceMemberConverter: FirestoreDataConverter<
  WorkspaceMemberDto,
  WorkspaceMemberDto
> = {
  toFirestore(options: WithFieldValue<WorkspaceMemberDto>) {
    return {
      ...options,
    };
  },
  fromFirestore(snapshot, options): WorkspaceMemberDto {
    const data = snapshot.data(options);
    const { emailId, memberId, memberName, workspaceDetails = {} } = data;
    const { id, name, imageUrl } = workspaceDetails ?? {};
    return {
      emailId,
      memberId,
      memberName,
      workspaceDetails: {
        id,
        name,
        imageUrl,
      },
      role: data?.role,
    };
  },
};
