import { FirestoreDataConverter, WithFieldValue } from 'firebase/firestore';
import { WorkspaceMemberRole } from '../types';
import { WorkspaceDto } from './workspace-dto';

export interface WorkspaceMemberDto {
  workspaceDetails: Pick<WorkspaceDto, 'id' | 'name' | 'imageUrl'>;
  memberName: string;
  emailId: string;
  memberId: string;
  role: WorkspaceMemberRole;
}

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
