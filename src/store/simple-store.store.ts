import { create } from 'zustand';

export const store = create<{ token: string }>((set) => ({
  token: 'Elonmusk',
}));
