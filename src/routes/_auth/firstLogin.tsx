import { FileRoute } from '@tanstack/react-router';

import { FirstLoginModal } from '@/components/modals/first-login.modal';

export const Route = new FileRoute('/_auth/firstLogin').createRoute({
  component: ProfileComponent,
});

export type User = {
  id: number;
  name: string;
  mobile: string;
  isFirstLogin: boolean;
};

function ProfileComponent() {
  return <FirstLoginModal />;
}
