import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ReactQueryProvider } from '@/components/providers/react-query.provider';
import { ThemeProvider } from '@/components/providers/theme-provider.provider';

import LoginPage from '@/pages/login/page';
import RootLayout from '@/pages/root.layout';
import RootPage from '@/pages/root.page';
import { NextUiProvider } from './components/providers/next-ui.provider';
import { Toaster } from './components/ui/Toaster';
import PrivateLayout from './pages/private/private-layout';

const router = createBrowserRouter([
  {
    id: 'protected-layout',
    element: <PrivateLayout />,
    children: [
      {
        id: 'index-layout',
        path: '/',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <RootPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <NextUiProvider>
        <ReactQueryProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ReactQueryProvider>
      </NextUiProvider>
    </ThemeProvider>
  );
}

export default App;
