import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ReactQueryProvider } from '@/components/providers/react-query.provider';
import { ThemeProvider } from '@/components/providers/theme-provider.provider';

import RootLayout from '@/pages/root.layout';
import RootPage from '@/pages/root.page';
import { Toaster } from './components/ui/Toaster';
import PrivateLayout from './pages/private/private-layout';
import RequestCode from './pages/(login)/request-code/page';
import VerifyCode from './pages/(login)/verify-code/page';
import { NextUiProvider } from './components/providers/next-ui.provider';
import { LoginLayout } from './pages/(login)/layout';
import { UrqlProvider } from './components/providers/urql.provider';

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
    element: <LoginLayout />,
    children: [
      {
        path: 'request-code',
        element: <RequestCode />,
        index: true,
      },
      {
        path: 'verify-code',
        element: <VerifyCode />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <NextUiProvider>
        <ReactQueryProvider>
          <UrqlProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
          </UrqlProvider>
        </ReactQueryProvider>
      </NextUiProvider>
    </ThemeProvider>
  );
}

export default App;
