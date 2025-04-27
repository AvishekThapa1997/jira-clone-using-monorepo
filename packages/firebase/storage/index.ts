import { getApp } from "..";
import type {
  UploadTaskSnapshot,
  StorageError,
  UploadTask,
  StorageReference,
} from "firebase/storage";

const getStorage = () =>
  import("./storage").then(async ({ getStorage, ref, ...remaining }) => {
    const app = await getApp();
    const storage = getStorage(app);
    return {
      storage,
      ref,
      ...remaining,
    };
  });

export { getStorage };
export type { UploadTaskSnapshot, StorageError, UploadTask, StorageReference };
