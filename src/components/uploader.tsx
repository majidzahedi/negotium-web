import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUploadStore } from '@/store/use-upload.store';

export const Uploader = () => {
  const { addUploads } = useUploadStore();
  const onDrop = useCallback((acceptedFiles: any) => {
    addUploads(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/jpeg': [] },
  });

  return (
    <div
      className={cn(
        'flex aspect-square w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed bg-muted text-muted-foreground shadow',
        isDragActive && 'border-primary ',
      )}
      {...getRootProps()}
    >
      <Upload className="h-8 w-8" />
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" {...getInputProps()} />
    </div>
  );
};
