import { ReactQueryProvider } from '@/components/providers/react-query.provider';
import { ThemeProvider } from '@/components/providers/theme-provider.provider';

import { Toaster } from './components/ui/Toaster';
import { NextUiProvider } from './components/providers/next-ui.provider';
import { UrqlProvider } from './components/providers/urql.provider';
import { Router, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

// const router = createBrowserRouter([
//   {
//     id: 'protected-layout',
//     element: <PrivateLayout />,
//     children: [
//       {
//         id: 'index-layout',
//         path: '/',
//         element: <RootLayout />,
//         children: [
//           {
//             index: true,
//             element: <RootPage />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/login',
//     element: <LoginLayout />,
//     children: [
//       {
//         path: 'request-code',
//         element: <RequestCode />,
//         index: true,
//       },
//       {
//         path: 'verify-code',
//         element: <VerifyCode />,
//       },
//     ],
//   },
// ]);
// Set up a Router instance
const router = new Router({
  routeTree,
  context: {
    auth: undefined!, // We'll inject this when we render
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
