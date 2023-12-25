import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export const NextUiProvider = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
