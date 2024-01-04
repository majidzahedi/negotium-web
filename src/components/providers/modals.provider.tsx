import { FirstLoginModal } from '../modals/first-login.modal';
import { UploadModal } from '../modals/upload.modal';

export const ModalProvider = () => {
  return (
    <>
      <UploadModal />
      <FirstLoginModal />
    </>
  );
};
