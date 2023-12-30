import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal.hook';
import { Uploader } from '../uploader';
import { cn } from '@/lib/utils';
import { useUpload } from '@/hooks/use-upload';
import {CircularProgress} from '@nextui-org/react'
import { useUploadStore } from '@/store/use-upload.store';

export const UploadModal = () => {
  const { isOpen, type, onClose } = useModal();
  const { files } = useUploadStore()

  const open = isOpen && type === 'upload';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <DialogDescription></DialogDescription>
        <Uploader />
        <div className="grid grid-cols-4 gap-4 py-2 w-full">
          {files?.map((file) => (
            <div
              key={file.id}
              className="flex w-full space-x-2 items-center relative rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square ">
                <div
                  className={cn(
                    "absolute  index-0 m-auto bg-black/10 w-full h-full rounded-lg",
                    file.status !== "finished"
                      ? "backdrop-blur-sm"
                      : "backdrop-blur-0"
                  )}
                />
                {file.status !== "finished" && (
                  <CircularProgress
                    value={file.progress.percentage}
                    aria-label="uploading..."
                    className="absolute  inset-0 m-auto h-full w-full "
                    classNames={{
                      svg: "w-full h-full rop-shadow-md",
                      indicator: "stroke-white",
                      track: "stroke-white/10",
                      value: "text-3xl font-semibold text-white",
                    }}
                    strokeWidth={4}
                    showValueLabel={true}
                  />
                )}
                <img
                  isBlurred
                  className="aspect-square object-cover h-full w-full rounded-lg"
                  src={file.status !== "finished" ? file.path : file.url}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
