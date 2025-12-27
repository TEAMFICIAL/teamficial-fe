'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '@/libs/api/mypage/dashboard';
import { ResponseDashboard } from '@/types/project';

export const useDashboard = () => {
  return useQuery<ResponseDashboard>({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });
};
