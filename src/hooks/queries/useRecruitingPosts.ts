'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecruitingPosts } from '@/libs/api/recruitingPosts';
import { PagedProjects } from '@/types/project';

export interface Filters {
  duration: string;
  recruit: string;
  onlyOpen: boolean;
}

export const useRecruitingPosts = (filters: Filters, pageNumber: number, pageSize = 9) => {
  return useQuery<PagedProjects>({
    queryKey: ['recruitingPosts', JSON.stringify(filters), pageNumber, pageSize],
    queryFn: async () => {
      const result = await getRecruitingPosts({
        status: filters.onlyOpen ? 'OPEN' : undefined,
        position: filters.recruit || undefined,
        progressWay: filters.duration || undefined,
        page: pageNumber - 1,
        size: pageSize,
        sort: [''],
      });
      console.log(result);
      return result;
    },
  });
};
