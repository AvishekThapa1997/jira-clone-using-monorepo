import { ErrorResult } from '@/types/types';
import {
  type UploadTaskSnapshot,
  type StorageError,
  type UploadTask,
  type StorageReference,
} from 'firebase/storage';
import { Reducer, useReducer, useRef } from 'react';
import { handleError } from '../util/handleError';
import { getStorage } from '@/config/firebase';

enum ImageUploaderActionType {
  DOWNLOAD_PROGRESS = 'DOWNLOAD_PROGRESS',
  DOWNLOAD_URL = 'DOWNLOAD_URL',
  ERROR = 'ERROR',
}

interface ImageDownloadProgressAction {
  type: ImageUploaderActionType.DOWNLOAD_PROGRESS;
  payload: number;
}

interface ImageDownloadUrlAction {
  type: ImageUploaderActionType.DOWNLOAD_URL;
  payload: string | null;
}

interface ImageUploadErrorAction {
  type: ImageUploaderActionType.ERROR;
  payload: ErrorResult | null;
}

type ImageUploaderAction =
  | ImageDownloadProgressAction
  | ImageDownloadUrlAction
  | ImageUploadErrorAction;

interface UseImageUploaderOptions {
  isValidFile?: (file: File | Blob) => boolean;
  dirName: string;
  onSuccess?: (downloadUrl: string) => void;
  onUploadStatusChange?: (status: boolean) => void;
}

interface ImageUploaderResult {
  uploadProgress: number;
  downloadUrl: string | null;
  error?: ErrorResult | null;
  isUploading: boolean;
  isUploadSuccess: boolean;
  cancel: () => void;
}

const INITIAL_IMAGE_UPLOADER_RESULT: ImageUploaderResult = {
  uploadProgress: 0,
  downloadUrl: null,
  error: null,
  isUploading: false,
  isUploadSuccess: false,
  cancel: () => {},
};

const imageUploaderReducer: Reducer<
  ImageUploaderResult,
  ImageUploaderAction
> = (_state, action) => {
  switch (action.type) {
    case ImageUploaderActionType.DOWNLOAD_PROGRESS: {
      return {
        ...INITIAL_IMAGE_UPLOADER_RESULT,
        uploadProgress: action.payload,
        isUploading: true,
      };
    }
    case ImageUploaderActionType.DOWNLOAD_URL: {
      return {
        ...INITIAL_IMAGE_UPLOADER_RESULT,
        downloadUrl: action.payload,
        isUploadSuccess: true,
      };
    }
    case ImageUploaderActionType.ERROR: {
      return {
        ...INITIAL_IMAGE_UPLOADER_RESULT,
        error: action.payload,
      };
    }
    default: {
      return INITIAL_IMAGE_UPLOADER_RESULT;
    }
  }
};

export const useImageUploader = ({
  dirName,
  onSuccess = () => {},
  onUploadStatusChange = () => {},
}: UseImageUploaderOptions) => {
  const [state, dispatch] = useReducer(
    imageUploaderReducer,
    INITIAL_IMAGE_UPLOADER_RESULT,
  );
  const uploadTaskRef = useRef<UploadTask | null>(null);
  const dispatchError = (error: unknown) => {
    dispatch({
      type: ImageUploaderActionType.ERROR,
      payload: handleError(error),
    });
  };
  const handleUploadState: (snapshot: UploadTaskSnapshot) => unknown = (
    snapshot,
  ) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    dispatch({
      type: ImageUploaderActionType.DOWNLOAD_PROGRESS,
      payload: progress,
    });
    switch (snapshot.state) {
      case 'running':
      case 'paused':
        return;
      default:
        uploadTaskRef.current = null;
    }
  };
  const handleUploadError: (err: StorageError) => unknown = async (err) => {
    dispatchError(err);
    onUploadStatusChange?.(false);
  };
  const handleUploadSuccess = async (
    uploadTask: UploadTask,
    getDownloadURL: (ref: StorageReference) => Promise<string>,
  ) => {
    try {
      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      onSuccess(downloadUrl);
      dispatch({
        type: ImageUploaderActionType.DOWNLOAD_URL,
        payload: downloadUrl,
      });
    } catch (err) {
      dispatchError(err);
    }
    onUploadStatusChange(false);
  };
  const uploadFile = async (file: File) => {
    try {
      const { storage, ref, getDownloadURL, uploadBytesResumable } =
        await getStorage();
      const workspaceIconRef = ref(
        storage,
        `${dirName}/${Date.now()}-${file.name}`,
      );
      const uploadTask = uploadBytesResumable(workspaceIconRef, file);
      uploadTaskRef.current = uploadTask;
      uploadTask.on(
        'state_changed',
        handleUploadState,
        handleUploadError,
        handleUploadSuccess.bind(this, uploadTask, getDownloadURL),
      );
      onUploadStatusChange?.(true);
    } catch (err) {
      dispatchError(err);
    }
  };

  const cancel = () => {
    if (uploadTaskRef.current) {
      const uploadTask = uploadTaskRef.current;
      uploadTask.cancel();
    }
  };
  return { uploadFile, ...state, cancel };
};
