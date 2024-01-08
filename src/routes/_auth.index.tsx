import { FileRoute } from '@tanstack/react-router';

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { apiAuth } from '@/lib/axios';

const whoAmI = () =>
  queryOptions({
    queryKey: ['whoAmI'],
    queryFn: () => apiAuth.get<User>('/user'),
    select: (res) => res.data,
  });

export const Route = new FileRoute('/_auth/').createRoute({
  loader: ({ context }) => context.queryClient.ensureQueryData(whoAmI()),
  component: ProfileComponent,
});

type User = {
  id: number;
  name: string;
  mobile: string;
  isFirstLogin: boolean;
};

function ProfileComponent() {
  const whoAmIQuery = useSuspenseQuery(whoAmI());

  const user = whoAmIQuery.data;

  return (
    <section className="flex h-[100dvh] w-full flex-col items-center justify-center space-y-4">
      {user.name}
    </section>
  );
}
