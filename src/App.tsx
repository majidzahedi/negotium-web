import { ThemeProvider } from '@/components/providers/theme-provider.provider';

import { Toaster } from './components/ui/Toaster';
import { NextUiProvider } from './components/providers/next-ui.provider';
import { UrqlProvider } from './components/providers/urql.provider';
import { Router, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { useToken } from './hooks/use-token';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
  },
  defaultPreload: 'intent',
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useToken();

  return (
    <ThemeProvider>
      <NextUiProvider>
        <QueryClientProvider client={queryClient}>
          <UrqlProvider>
            <RouterProvider router={router} context={{ auth }} />
            <Toaster position="top-right" />
          </UrqlProvider>
        </QueryClientProvider>
      </NextUiProvider>
    </ThemeProvider>
  );
}

export default App;
