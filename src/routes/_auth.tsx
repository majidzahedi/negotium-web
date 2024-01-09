import { MenubarDemo } from '@/components/MenubarDemo';
import { ModalProvider } from '@/components/providers/modals.provider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useUpload } from '@/hooks/use-upload';
import { myAgencyAgents, whoAmI } from '@/lib/query-options';
import { notificationService } from '@/services/notification.service';
import { Avatar } from '@nextui-org/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FileRoute, Outlet, redirect, Link } from '@tanstack/react-router';

export const Route = new FileRoute('/_auth').createRoute({
  beforeLoad: ({ context, location }) => {
    const auth = context.auth;

    if (!auth.token?.accessToken) {
      throw redirect({
        to: '/login/request-code',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async ({ context, navigate }) => {
    const { data } = await context.queryClient.ensureQueryData(whoAmI());
    await context.queryClient.ensureQueryData(myAgencyAgents());
    if (data.isFirstLogin) {
      navigate({
        to: 'firstLogin',
      });
    }
  },
  component: RootComponent,
});

export function RootComponent() {
  const whoAmIQuery = useSuspenseQuery(whoAmI());
  const myAgencyAgentsQuery = useSuspenseQuery(myAgencyAgents());
  const user = whoAmIQuery.data;
  const agencies = myAgencyAgentsQuery.data;

  useUpload();
  notificationService();

  return (
    <main className="flex min-h-[100dvh] w-full flex-col">
      <ModalProvider />
      <MenubarDemo user={user} />
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[calc(100dvh-41px)]"
      >
        <ResizablePanel>
          <div className="flex flex-col space-y-4 p-2">
            {agencies.map((agent) => (
              <Link
                to="/$agencyId"
                params={{ agencyId: agent?.agency?.agencyId }}
                className="flex items-center space-x-4 rtl:space-x-reverse"
                key={agent.id}
              >
                <Avatar
                  src={agent?.agency?.imageUrl}
                  name={agent?.agency?.name}
                />
                <p>{agent?.agency?.name}</p>
                <p>{agent?.role}</p>
              </Link>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={80}
          className="h-[calc(100dvh-41px)] w-full"
        >
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
