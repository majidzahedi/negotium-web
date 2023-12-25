import { Outlet } from 'react-router-dom';

import { MenubarDemo } from '@/components/MenubarDemo';
import { Button } from '@/components/ui/button';
import { Minimize2, X } from 'lucide-react';
import { useDir } from '@/hooks/use-dir';

function RootLayout() {
  useDir();

  return (
    <main className="flex min-h-[100dvh] w-full ">
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
    </main>
  );
}

export default RootLayout;
