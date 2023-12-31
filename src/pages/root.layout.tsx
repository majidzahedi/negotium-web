import { Minimize2, Upload, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { MenubarDemo } from '@/components/MenubarDemo';
import { ModalProvider } from '@/components/providers/modals.provider';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal.hook';
import { useUpload } from '@/hooks/use-upload';

function RootLayout() {
  const { onOpen } = useModal();
  useUpload();

  return (
    <main className="flex min-h-[100dvh] w-full ">
      <ModalProvider />
      <MenubarDemo />
      <div className="fixed right-0 top-0 flex h-9 items-center  ">
        <Button variant="ghost">
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className=" rounded-br-none rounded-tl-none hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Outlet />
      <Button
        size="icon"
        onClick={() => onOpen('upload')}
        className="fixed bottom-2 left-2 h-7 w-7 rounded-full"
      >
        <Upload className="h-4 w-4" />
      </Button>
    </main>
  );
}

export default RootLayout;
