import { cn } from '@nextui-org/react';
import { Upload, X } from 'lucide-react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { useUploadStore } from '@/store/use-upload.store';

import { UploadPlaceholder } from '@/components/modals/upload.modal';
import { Button } from '@/components/ui/button';

export const AvatarDropzone = ({
  onChange,
}: {
  onChange: (e: any) => void;
}) => {
  const { files, addUpload, clearAll } = useUploadStore();

  const onDrop = (acceptedFiles: File[]) => {
    clearAll();
    addUpload(acceptedFiles[0], 'avatar');
  };

  const clear = () => {
    clearAll();
    onChange('');
  };

  useEffect(() => {
    if (files.length > 0 && files[0].status === 'finished') {
      onChange(files[0].url);
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024 * 1,
    maxFiles: 1,
    accept: { 'image/jpeg': [], 'image/png': [] },
  });

  return files.length > 0 ? (
    <div className="relative ">
      <Button
        size="icon"
        variant="destructive"
        className="absolute right-1 top-1 z-50 h-5 w-5 rounded-full"
        onClick={() => clear()}
      >
        <X className="h-4 w-4 text-foreground" />
      </Button>
      <div className="h-24 w-24  overflow-hidden rounded-full">
        <UploadPlaceholder file={files?.[0]} />
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'flex aspect-square h-24 w-24 flex-col items-center justify-center gap-y-4 rounded-full border border-dashed bg-muted text-muted-foreground shadow',
        isDragActive && 'border-primary ',
      )}
      {...getRootProps()}
    >
      <Upload className="h-8 w-8" />
      <input type="file" {...getInputProps()} />
    </div>
  );
};
