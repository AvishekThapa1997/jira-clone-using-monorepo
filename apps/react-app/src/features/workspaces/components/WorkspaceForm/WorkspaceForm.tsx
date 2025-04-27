import { LoadingButton } from '@/shared/components/ui/LoadingButton';
import { Button, type ButtonProps } from '@/shared/components/ui/button';
import { FormInput } from '@/shared/components/ui/form';
import { Label } from '@/shared/components/ui/label';
import { Progress } from '@/shared/components/ui/progress';
import { Separator } from '@/shared/components/ui/separator';
import { useImageUploader } from '@/shared/hooks/useImageUploader';

import { Choose } from '@/shared/components/Choose';
import { If } from '@/shared/components/If';
import { Box } from '@/shared/components/ui/box';
import { Text } from '@/shared/components/ui/text';
import { WORKSPACE_CONSTANTS } from '@jira-clone/core/constants/workspace';
import { cn } from '@jira-clone/core/utils';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Upload, X } from 'lucide-react';
import { useId, useMemo, useRef, useState } from 'react';
import { WorkspaceFormProps } from '../../types';

interface WorkspaceIconUploadSectionProps {
  onImageSelected: (downloadUrl?: string) => void;
  handledIconUploadStatus: (isUploading: boolean) => void;
  initialValue?: string;
}

const WorkspaceForm = ({
  className,
  handleCancel,
  selectedWorkspace,
  onWorkspaceCreated,
  handleSubmit,
  errors,
  isSubmitting = false,
  ...props
}: WorkspaceFormProps) => {
  const [_, addItem] = useLocalStorage(
    WORKSPACE_CONSTANTS.LAST_SELECTED_WORKSPACE_KEY,
  );
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const [uploadedWorkspaceIconUrl, setUploadedWorkspaceIconUrl] = useState<
    string | undefined
  >();

  const nameFieldId = useId();
  const [isIconUploading, setIconUploading] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event, {
      onSuccess(result) {
        if (nameFieldRef.current) {
          nameFieldRef.current.value = '';
        }
        setUploadedWorkspaceIconUrl(undefined);
        if (!selectedWorkspace.id) {
          addItem(result.data);
          onWorkspaceCreated?.(result.data);
        }
      },
    });
  };

  const handleWorkspaceIconUpload = (downloadUrl?: string) => {
    setUploadedWorkspaceIconUrl(downloadUrl);
  };
  const handledIconUploadStatus = (isUploading: boolean) => {
    setIconUploading(isUploading);
  };

  const buttonLabel = selectedWorkspace?.id
    ? 'Update Workspace'
    : 'Create Workspace';
  return (
    <form
      className={cn('space-y-4', className)}
      onSubmit={submitHandler}
      {...props}
    >
      <Box className='space-y-2'>
        <Label htmlFor={nameFieldId}>Workspace Name</Label>
        <FormInput
          variant='lg'
          id={nameFieldId}
          placeholder='Enter workspace name'
          name='name'
          required
          minLength={WORKSPACE_CONSTANTS.WORKSPACE_MIN_LENGTH}
          ref={nameFieldRef}
          disabled={isSubmitting}
          isError={!!errors?.name}
          errorMessage={errors?.name?.message}
          defaultValue={selectedWorkspace?.name}
        />
      </Box>
      <FormInput
        type='hidden'
        name='imageUrl'
        value={uploadedWorkspaceIconUrl}
      />
      <Box>
        <WorkspaceIconUploadSection
          onImageSelected={handleWorkspaceIconUpload}
          handledIconUploadStatus={handledIconUploadStatus}
          initialValue={selectedWorkspace?.imageUrl}
        />
      </Box>
      <Separator />
      <Box className='flex gap-4 justify-end'>
        <If check={!!handleCancel}>
          <Button
            type='button'
            variant='secondary'
            onClick={() => handleCancel()}
            disabled={isSubmitting || isIconUploading}
          >
            Cancel
          </Button>
        </If>
        <LoadingButton disabled={isSubmitting || isIconUploading} type='submit'>
          {buttonLabel}
        </LoadingButton>
      </Box>
    </form>
  );
};

const WorkspaceIconUploadSection = ({
  onImageSelected,
  handledIconUploadStatus,
  initialValue,
}: WorkspaceIconUploadSectionProps) => {
  const iconFieldId = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const workspaceIconFieldRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(initialValue || null);

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
    URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    onImageSelected();
  };
  const selectedFilePreviewUrl = useMemo(() => {
    if (selectedFile) {
      objectUrlRef.current = URL.createObjectURL(selectedFile);
      return objectUrlRef.current;
    } else if (objectUrlRef.current) {
      return objectUrlRef.current;
    }
    return null;
  }, [selectedFile, objectUrlRef.current]);
  const canRemoveSelectedFile = !!selectedFilePreviewUrl;

  return (
    <Box className='flex gap-4'>
      <Box className='relative size-14 bg-muted flex items-center justify-center overflow-hidden rounded-sm'>
        <If check={isUploading}>
          <Progress
            value={uploadProgress}
            className='absolute inset-x-0 top-0 h-1 w-full'
          />
        </If>
        <Label htmlFor={iconFieldId} className='sr-only'>
          Upload workspace icon
        </Label>
        <FormInput
          type='file'
          id={iconFieldId}
          ref={workspaceIconFieldRef}
          className='sr-only'
          accept={WORKSPACE_CONSTANTS.WORKSPACE_ICON_SUPPORTED_FORMATS.map(
            (format) => `image/${format}`,
          ).join(', ')}
          onChange={handleFileChange}
        />
        <Choose>
          <If check={canRemoveSelectedFile}>
            <RemoveWorkspaceIconButton
              size='icon'
              className={cn({
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
                  isUploading,
                'top-0.5 right-0.5 z-50': isUploadSuccess || initialValue,
              })}
              onClick={removeSelectedFile}
            />
          </If>
          <If check={!canRemoveSelectedFile}>
            <Upload size={20} className='text-muted-foreground' />
          </If>
        </Choose>
        <If check={!!selectedFilePreviewUrl}>
          <WorkspaceIconPreview previewUrl={selectedFilePreviewUrl} />
        </If>
      </Box>

      <Box className='text-sm font-semibold space-y-2'>
        <Box>
          <Text>Workspace Icon</Text>
          <Text className='text-muted-foreground font-normal'>
            {WORKSPACE_CONSTANTS.WORKSPACE_ICON_SUPPORTED_FORMATS.join(', ')},
            max 1MB
          </Text>
        </Box>
        <Button
          type='button'
          className='h-7 font-normal text-xs tracking-wider'
          onClick={() => workspaceIconFieldRef.current?.click()}
          disabled={isUploading}
        >
          Choose Image
        </Button>
      </Box>
    </Box>
  );
};

const WorkspaceIconPreview = ({ previewUrl }: { previewUrl: string }) => {
  return (
    <img
      src={previewUrl}
      alt='Selected file'
      className='max-h-full max-w-full'
    />
  );
};

const RemoveWorkspaceIconButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      size='icon'
      className={cn(
        'absolute rounded-full bg-muted-foreground/80 hover:bg-muted-foreground/80 flex items-center justify-center p-0.5 h-fit w-fit',
        className,
      )}
      {...props}
    >
      <X size={12} />
    </Button>
  );
};

export { WorkspaceForm };
