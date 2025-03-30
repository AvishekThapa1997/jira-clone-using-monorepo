import { LoadingButton } from '@/shared/components/ui/LoadingButton';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Progress } from '@/shared/components/ui/progress';
import { Separator } from '@/shared/components/ui/separator';
import { useImageUploader } from '@/shared/hooks/useImageUploader';

import { useEventDispatcher } from '@/shared/hooks/useEventDispatcher';
import { CUSTOM_EVENT } from '@jira-clone/core/constants/shared';
import { WORKSPACE_CONSTANTS } from '@jira-clone/core/constants/workspace';
import { cn } from '@jira-clone/core/utils';
import { Upload, X } from 'lucide-react';
import {
  ComponentProps,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCreateWorkspace } from '../../hooks/useCreateWorkspace';
import { If } from '@/shared/components/If';
import { useNavigate } from 'react-router';
import type { WorkspaceCreatedEvent } from '@jira-clone/core/types';
import { useSelectWorkspace } from '../../hooks/useSelectWorkspace';
import { useNewWorkspaceDispatcher } from '../../hooks/useNewWorkspaceDispatcher';
import { useLocalStorage } from '@uidotdev/usehooks';

interface CreateWorkspaceFormProps
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  handleCancel?: () => void;
}

interface WorkspaceIconUploadSectionProps {
  onImageSelected: (downloadUrl?: string) => void;
  handledIconUploadStatus: (isUploading: boolean) => void;
}

const CreateWorkspaceForm = ({
  className,
  handleCancel,
  ...props
}: CreateWorkspaceFormProps) => {
  const [_, addItem] = useLocalStorage(
    WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
  );
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const [uploadedWorkspaceIconUrl, setUploadedWorkspaceIconUrl] = useState<
    string | undefined
  >(() => {
    return undefined;
  });
  const keyRef = useRef<number>(0);
  const nameFieldId = useId();
  const [isIconUploading, setIconUploading] = useState(false);
  const dispatch = useNewWorkspaceDispatcher();
  const {
    mutate,
    isPending,
    data,
    error: err,
  } = useCreateWorkspace({
    onSuccess: (result) => {
      if (nameFieldRef.current) {
        nameFieldRef.current.value = '';
      }
      keyRef.current += 1;
      setUploadedWorkspaceIconUrl(undefined);
      dispatch({
        data: result.data,
      });
      addItem(result.data);
    },
  });
  const error = data?.error;
  if (err) {
    throw err;
  }
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const workSpaceName = nameFieldRef.current?.value;
    mutate({ name: workSpaceName, imageUrl: uploadedWorkspaceIconUrl });
  };

  const handleWorkspaceIconUpload = (downloadUrl?: string) => {
    setUploadedWorkspaceIconUrl(downloadUrl);
  };
  const handledIconUploadStatus = (isUploading: boolean) => {
    setIconUploading(isUploading);
  };
  return (
    <form
      className={cn('space-y-4', className)}
      onSubmit={submitHandler}
      {...props}
    >
      <div className='space-y-2'>
        <Label htmlFor={nameFieldId}>Workspace Name</Label>
        <Input
          variant='lg'
          id={nameFieldId}
          placeholder='Enter workspace name'
          name='name'
          required
          minLength={WORKSPACE_CONSTANTS.WORKSPACE_MIN_LENGTH}
          ref={nameFieldRef}
          disabled={isPending}
          isError={!!error?.validationErrors?.name}
          errorMessage={error?.validationErrors?.name?.message}
        />
      </div>
      <div>
        <WorkspaceIconUploadSection
          onImageSelected={handleWorkspaceIconUpload}
          handledIconUploadStatus={handledIconUploadStatus}
          key={keyRef.current}
        />
      </div>
      <Separator />
      <div className='flex gap-4 justify-end'>
        <If check={!!handleCancel}>
          <Button
            type='button'
            variant='secondary'
            onClick={() => handleCancel()}
            disabled={isPending || isIconUploading}
          >
            Cancel
          </Button>
        </If>
        <LoadingButton disabled={isPending || isIconUploading} type='submit'>
          Create Workspace
        </LoadingButton>
      </div>
    </form>
  );
};

const WorkspaceIconUploadSection = ({
  onImageSelected,
  handledIconUploadStatus,
}: WorkspaceIconUploadSectionProps) => {
  const iconFieldId = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const workspaceIconFieldRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  useEffect(
    function cleanUpObjectUrl() {
      return () => {
        if (objectUrlRef.current && selectedFile) {
          URL.revokeObjectURL(objectUrlRef.current);
        }
      };
    },
    [selectedFile],
  );
  const { uploadFile, uploadProgress, cancel, isUploading, isUploadSuccess } =
    useImageUploader({
      dirName: 'workspaces',
      isValidFile: (file) => file.size <= 1 * 1024 * 1024, // Max 1MB
      onSuccess: (downloadUrl) => {
        onImageSelected(downloadUrl);
      },
      onUploadStatusChange: (status) => {
        handledIconUploadStatus(status);
      },
    });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      event.target.value = ''; // Reset input
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const removeSelectedFile = () => {
    if (isUploading) {
      cancel();
    }
    setSelectedFile(null);
    onImageSelected();
  };
  const selectedFilePreviewUrl = useMemo(() => {
    if (selectedFile) {
      objectUrlRef.current = URL.createObjectURL(selectedFile);
      return objectUrlRef.current;
    }
    return selectedFile;
  }, [selectedFile]);
  const canRemoveSelectedFile =
    (isUploadSuccess || isUploading) && selectedFilePreviewUrl;
  return (
    <div className='flex gap-4'>
      <div className='relative size-14 bg-muted flex items-center justify-center overflow-hidden rounded-sm'>
        {isUploading && (
          <Progress
            value={uploadProgress}
            className='absolute inset-x-0 top-0 h-1 w-full'
          />
        )}

        <label htmlFor={iconFieldId} className='sr-only'>
          Upload workspace icon
        </label>
        <Input
          type='file'
          id={iconFieldId}
          ref={workspaceIconFieldRef}
          className='sr-only'
          accept={WORKSPACE_CONSTANTS.WORKSPACE_ICON_SUPPORTED_FORMATS.map(
            (format) => `image/${format}`,
          ).join(', ')}
          onChange={handleFileChange}
        />

        {canRemoveSelectedFile ? (
          <Button
            size='icon'
            className={cn(
              'absolute rounded-full bg-muted-foreground/80 hover:bg-muted-foreground/80 flex items-center justify-center p-0.5 h-fit w-fit',
              {
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
                  isUploading,
                'top-0.5 right-0.5 z-50': isUploadSuccess,
              },
            )}
            onClick={removeSelectedFile}
          >
            <X size={12} />
          </Button>
        ) : (
          <Upload size={20} className='text-muted-foreground' />
        )}

        {selectedFilePreviewUrl && (
          <img
            src={objectUrlRef.current}
            alt='Selected file'
            className='max-h-full max-w-full'
          />
        )}
      </div>

      <div className='text-sm font-semibold space-y-2'>
        <div>
          <p>Workspace Icon</p>
          <p className='text-muted-foreground font-normal'>
            <span className='uppercase'>
              {WORKSPACE_CONSTANTS.WORKSPACE_ICON_SUPPORTED_FORMATS.join(', ')}
            </span>
            , max 1MB
          </p>
        </div>
        <Button
          type='button'
          className='h-7 font-normal text-xs tracking-wider'
          onClick={() => workspaceIconFieldRef.current?.click()}
          disabled={isUploading}
        >
          Choose Image
        </Button>
      </div>
    </div>
  );
};

export { CreateWorkspaceForm };
