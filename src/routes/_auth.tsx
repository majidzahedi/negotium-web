import { MenubarDemo } from '@/components/MenubarDemo';
import { ModalProvider } from '@/components/providers/modals.provider';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal.hook';
import { useUpload } from '@/hooks/use-upload';
import { notificationService } from '@/services/notification.service';
import { FileRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Minimize2, Upload, X } from 'lucide-react';

export const Route = new FileRoute('/_auth').createRoute({
  // Before loading, authenticate the user via our auth context
  // This will also happen during prefetching (e.g. hovering over links, etc)
  beforeLoad: ({ location }) => {
    // If the user is logged out, redirect them to the login page
    if (false) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }

    // Otherwise, return the user in context
    return {
      username: 'majid zahedi',
    };
  },
  component: RootComponent,
});

export function RootComponent() {
  const { onOpen } = useModal();

  useUpload();
  notificationService();

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
          className="rounded-br-none rounded-tl-none hover:bg-destructive hover:text-destructive-foreground"
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
      <TanStackRouterDevtools />
    </main>
  );
}
