import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/components/providers/theme-provider.provider';
import { ReactQueryProvider } from '@/components/providers/react-query.provider';

import RootLayout from '@/pages/root.layout';
import RootPage from '@/pages/root.page';
import LoginPage from '@/pages/login/page';
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
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;
