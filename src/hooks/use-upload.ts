import { useEffect } from 'react';
import { useUploadStore } from '@/store/use-upload.store';

export const useUpload = () => {
  const {
    uploaders,
    files,
    addUploads,
    concurrentUploads,
    addConcurrentUpload,
  } = useUploadStore();

  useEffect(() => {
    const readyToUpload = files.filter((file) => file.status === 'initiated');

    readyToUpload.slice(0, 1 - concurrentUploads).map((file) => {
      const uploader = uploaders.find((uploader) => uploader.id === file.id)
        ?.uploader;

      if (uploader) {
        addConcurrentUpload();
        uploader.start();
      }
    });
  }, [uploaders, files, concurrentUploads]);

  return { addUploads, files };
};
