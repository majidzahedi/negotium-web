import { ModeToggle } from '@/components/theme/mode-toggle';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <main className="flex min-h-[100dvh] w-full ">
      <div className="fixed left-4 top-4">
        <ModeToggle />
      </div>
      <Outlet />
    </main>
  );
}

export default RootLayout;
