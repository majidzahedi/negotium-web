import { useApiAuth } from '@/hooks/use-api-auth';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

type User = {
  id: number;
  name: string;
  mobile: string;
};

function RootPage() {
  const api = useApiAuth();
  const { data: user, isPending } = useQuery({
    queryKey: ['whoAmI'],
    queryFn: () => api.get<User>('/user'),
    select: (res) => res.data,
  });

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

export default RootPage;
