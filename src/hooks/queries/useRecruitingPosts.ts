'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecruitingPosts } from '@/api/recruitingPosts';
import { PagedProjects } from '@/types/project';

interface Filters {
  duration: string;
  recruit: string;
  onlyOpen: boolean;
}

export const useRecruitingPosts = (filters: Filters, page: number, pageSize = 9) => {
  return useQuery<PagedProjects>({
    queryKey: ['recruitingPosts', filters, page],
    queryFn: async () => {
      const result = await getRecruitingPosts({
        status: filters.onlyOpen ? 'OPEN' : 'CLOSED',
        position: filters.recruit || undefined,
        progressWay: filters.duration || undefined,
        pageable: { page: page - 1, size: pageSize, sort: ['createdAt,desc'] },
      });
      return result;
    },
  });
};
