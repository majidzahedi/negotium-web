import { queryOptions } from '@tanstack/react-query';
import { apiAuth } from './axios';

type Role = 'ADMIN' | 'GUEST' | 'AGENT';

export type User = {
  id: number;
  name: string;
  mobile: string;
  imageUrl: string;
  isFirstLogin: boolean;
};

export type Agency = {
  id: number;
  agencyId: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
};

export type Agent = {
  id: number;
  role: Role;
  agency: Agency;
};

export const whoAmI = () =>
  queryOptions({
    queryKey: ['whoAmI'],
    queryFn: () => apiAuth.get<User>('/user'),
    select: (res) => res.data,
  });

export const myAgencyAgents = () =>
  queryOptions({
    queryKey: ['myAgencyAgents'],
    queryFn: () => apiAuth.get<Agent[]>('/agency'),
    select: (res) => res.data,
  });
