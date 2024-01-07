import { FileRoute } from '@tanstack/react-router';

import { useApiAuth } from '@/hooks/use-api-auth';
import { useModal } from '@/hooks/use-modal.hook';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export const Route = new FileRoute('/_auth/').createRoute({
  component: ProfileComponent,
});

type User = {
  id: number;
  name: string;
  mobile: string;
  isFirstLogin: boolean;
};

function ProfileComponent() {
  const api = useApiAuth();
  const { onOpen } = useModal();

  const { data: user, isPending } = useQuery({
    queryKey: ['whoAmI'],
    queryFn: () => api.get<User>('/user'),
    select: (res) => res.data,
  });

  useEffect(() => {
    if (user?.isFirstLogin) {
      onOpen('FirstLoginModal');
    }
  }, [user?.isFirstLogin]);

  return (
    <section className="flex h-[100dvh] w-full flex-col items-center justify-center space-y-4">
      {!isPending ? (
        <p className="text-3xl">{user?.mobile}</p>
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </section>
  );
}
