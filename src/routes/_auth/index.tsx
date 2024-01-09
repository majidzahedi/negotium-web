import { FileRoute } from '@tanstack/react-router';

import { useSuspenseQuery } from '@tanstack/react-query';
import { whoAmI } from '@/lib/query-options';
import { Avatar } from '@nextui-org/react';

export const Route = new FileRoute('/_auth/').createRoute({
  component: ProfileComponent,
});

function ProfileComponent() {
  const whoAmIQuery = useSuspenseQuery(whoAmI());
  const user = whoAmIQuery.data;

  return (
    <section className="flex h-full  flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar src={user.imageUrl} size="lg" />
        <div className="flex flex-col">
          <p className="text-2xl">{user.name}</p>
          <p>{user.mobile}</p>
        </div>
      </div>
    </section>
  );
}
