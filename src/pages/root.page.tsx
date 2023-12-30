import { Button } from '@/components/ui/button';
import { useApiAuth } from '@/hooks/use-api-auth';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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

  const promise = () =>
    new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: 'Sonner' }), 2000),
    );

  const download = () => {
    toast.promise(promise, {
      success: (data) => {
        return `${data?.name} toast has been added!`;
      },
      error: 'Error',
      position: 'top-right',
    });
  };

  const { t } = useTranslation();

  return (
    <section className="flex h-[100dvh] w-full flex-col items-center justify-center space-y-4">
      <h3 className="text-4xl font-bold">Hello World</h3>
      <p>Zustand + @tanstack/React-query + tailwindcss</p>
      <p>Semantic-release + Commitlint</p>
      <p>You Are Logged as {user?.email}</p>
      <h1>
        Our Translated Header:
        {t('headerTitle', { appName: 'App for Translations' })}
      </h1>
      <Button variant="outline" onClick={download}>
        <span>Start Download</span>
      </Button>
    </section>
  );
}

export default RootPage;
