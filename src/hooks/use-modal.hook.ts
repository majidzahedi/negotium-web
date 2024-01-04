import { create } from 'zustand';

type modalTypes = 'upload' | 'FirstLoginModal';

interface useModalProp {
  isOpen: boolean;
  type: modalTypes | null;
  onOpen: (type: modalTypes) => void;
  onClose: () => void;
}

export const useModal = create<useModalProp>((set) => ({
  isOpen: true,
  type: 'FirstLoginModal',
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
