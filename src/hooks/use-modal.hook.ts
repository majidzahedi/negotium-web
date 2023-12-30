import { create } from 'zustand';

type modalTypes = 'upload';

interface useModalProp {
  isOpen: boolean;
  type: modalTypes | null;
  onOpen: (type: modalTypes) => void;
  onClose: () => void;
}

export const useModal = create<useModalProp>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
