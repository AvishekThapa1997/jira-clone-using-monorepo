import { app } from '..';
import type {
  UploadTaskSnapshot,
  StorageError,
  UploadTask,
  StorageReference,
} from 'firebase/storage';

const getStorage = () =>
  import('./storage').then(({ getStorage, ref, ...remaining }) => {
    const storage = getStorage(app);
    return {
      storage,
      ref,
      ...remaining,
    };
  });

export { getStorage };
export type { UploadTaskSnapshot, StorageError, UploadTask, StorageReference };
