import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Uploader, ProgressInfo } from '@/lib/uploader';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

type UploadFile = {
  id: string;
  path: string;
  url: string | null;
  status: 'initiated' | 'started' | 'finished' | 'error';
  progress: ProgressInfo;
  error: AxiosError | null;
};

type UploaderClass = {
  id: string;
  uploader: any;
};

type UploadType = 'avatar';

interface useUploadStore {
  uploaders: UploaderClass[];
  files: UploadFile[];
  concurrentUploads: number;
  addConcurrentUpload: () => void;
  addUploads: (files: File[], type: UploadType) => void;
  editFile: (id: string, data: Partial<UploadFile>) => void;
}

export const useUploadStore = create<useUploadStore>((set, get) => ({
  uploaders: [],
  files: [],
  concurrentUploads: 0,
  addConcurrentUpload: () =>
    set((state) => ({ concurrentUploads: state.concurrentUploads + 1 })),
  addUploads: (files, type) => {
    files.map((file) => {
      const id = nanoid();
      const newFile: UploadFile = {
        id,
        path: URL.createObjectURL(file),
        url: null,
        status: 'initiated',
        progress: { sent: 0, total: 0, percentage: 0 },
        error: null,
      };

      // @ts-ignore
      const uploader = new Uploader({ file, path: type });

      uploader
        .onInitialize(() => {
          get().editFile(id, { status: 'started' });
        })
        .onProgress((progress) => get().editFile(id, { progress }))
        .onCompleted((response: string) => {
          get().editFile(id, {
            url: response,
            status: 'finished',
          });
          set((state) => ({
            concurrentUploads: state.concurrentUploads - 1,
          }));
        })
        .onError((error) => {
          get().editFile(id, { error: error as AxiosError, status: 'error' });
          set((state) => ({
            concurrentUploads: state.concurrentUploads - 1,
          }));
        });

      set((state) => ({
        files: [...state.files, newFile],
        uploaders: [...state.uploaders, { id, uploader }],
      }));
    });
  },
  editFile: (id, data) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, ...data } : file,
      ),
    })),
}));
