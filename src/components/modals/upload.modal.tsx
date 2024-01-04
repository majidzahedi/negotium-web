import { CircularProgress } from '@nextui-org/react';
import { useMediaQuery } from '@uidotdev/usehooks';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { Drawer, DrawerContent } from '@/components/ui/drawer';

import { Uploader } from '@/components/uploader';

import { cn } from '@/lib/utils';
import { useUploadStore } from '@/store/use-upload.store';
import { useModal } from '@/hooks/use-modal.hook';

export const UploadModal = () => {
  const { isOpen, type, onClose } = useModal();
  const { files } = useUploadStore();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const open = isOpen && type === 'upload';

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <div className="grid w-full grid-cols-4 gap-4 py-2">
            {files?.map((file) => (
              <div
                key={file.id}
                className="relative flex w-full items-center space-x-2 overflow-hidden rounded-lg "
              >
                <div className="relative aspect-square ">
                  <div
                    className={cn(
                      'index-0  absolute m-auto h-full w-full rounded-lg ',
                      file.status !== 'finished'
                        ? 'bg-background/40 '
                        : 'backdrop-blur-0',
                    )}
                  />
                  {file.status !== 'finished' && (
                    <CircularProgress
                      value={file.progress.percentage}
                      aria-label="uploading..."
                      className="absolute  inset-0 m-auto h-full w-full "
                      classNames={{
                        svg: 'w-full h-full rop-shadow-md',
                        indicator: 'stroke-foreground',
                        track: 'stroke-foreground/10',
                        value: 'text-2xl font-semibold text-foreground',
                      }}
                      strokeWidth={3}
                      showValueLabel={true}
                    />
                  )}
                  <img
                    className="aspect-square h-full w-full rounded-lg object-cover"
                    src={
                      file.status !== 'finished'
                        ? (file.path as string)
                        : (file.url as string)
                    }
                    alt=""
                  />
                </div>
              </div>
            ))}
            <Uploader />
          </div>
        </DialogContent>
      </Dialog>
    );

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={(value) => value !== open && onClose()}>
        <DrawerContent>
          <div className="grid w-full grid-cols-4 gap-2 p-2 sm:gap-4 ">
            {files?.map((file) => (
              <UploadPlaceholder file={file} key={file.id} />
            ))}
            <Uploader />
          </div>
        </DrawerContent>
      </Drawer>
    );
};

export const UploadPlaceholder = ({ file }: { file: any }) => {
  return (
    <div className="relative flex w-full items-center space-x-2 overflow-hidden rounded-lg ">
      <div className="relative aspect-square ">
        <div
          className={cn(
            'index-0  absolute m-auto h-full w-full rounded-lg ',
            file?.status !== 'finished'
              ? 'bg-background/40 '
              : 'backdrop-blur-0',
          )}
        />
        {file.status !== 'finished' && (
          <CircularProgress
            value={file?.progress?.percentage}
            aria-label="uploading..."
            className="absolute  inset-0 m-auto h-full w-full "
            classNames={{
              svg: 'w-full h-full rop-shadow-md',
              indicator: 'stroke-foreground',
              track: 'stroke-foreground/10',
              value: 'text-2xl font-semibold text-foreground',
            }}
            strokeWidth={3}
            showValueLabel={true}
          />
        )}
        <img
          className="aspect-square h-full w-full rounded-lg object-cover"
          src={
            file?.status !== 'finished'
              ? (file.path as string)
              : (file.url as string)
          }
          alt=""
        />
      </div>
    </div>
  );
};
