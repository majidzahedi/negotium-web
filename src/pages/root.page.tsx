import { useApiAuth } from '@/hooks/use-api-auth';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  email: string;
}

function RootPage() {
  const api = useApiAuth();

  const { data: user } = useQuery({
    queryKey: ['whoAmI'],
    queryFn: () => api.get<User>('/user'),
    select: (data) => data.data,
  });

  return (
    <section className="flex h-[100dvh] w-full flex-col items-center justify-center space-y-4">
      <h3 className="text-4xl font-bold">Hello World</h3>
      <p>Zustand + @tanstack/React-query + tailwindcss</p>
      <p>Semantic-release + Commitlint</p>
      <p>You Are Logged as {user?.email}</p>
    </section>
  );
}

export default RootPage;
