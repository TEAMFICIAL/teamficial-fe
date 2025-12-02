'use client';

import { getMyTeams } from '@/libs/api/mypage/applicant';
import { useQuery } from '@tanstack/react-query';

export function useMyTeams(page: number = 0, size: number = 6) {
  return useQuery({
    queryKey: ['myTeams', page, size],
    queryFn: () => getMyTeams(page, size),
  });
}
