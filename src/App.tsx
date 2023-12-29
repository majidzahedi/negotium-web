import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import { ReactQueryProvider } from '@/components/providers/react-query.provider';
import { ThemeProvider } from '@/components/providers/theme-provider.provider';

import RootLayout from '@/pages/root.layout';
import RootPage from '@/pages/root.page';
import { Toaster } from './components/ui/Toaster';
import PrivateLayout from './pages/private/private-layout';
import RequestCode from './pages/(login)/request-code/page';
import VerifyCode from './pages/(login)/verify-code/page';

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
    element: <Outlet />,
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
      <ReactQueryProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;
