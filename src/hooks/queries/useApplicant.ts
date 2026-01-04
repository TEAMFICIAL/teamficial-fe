'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentApplicants, getMyApplications } from '@/libs/api/mypage/applicant';
import { ResponseApplications, ResponseCurrentApplicants } from '@/types/applicant';

export const useMyApplications = (applicationStatus: string, page: number, size: number = 6) => {
  return useQuery<ResponseApplications>({
    queryKey: ['myApplications', applicationStatus, page, size],
    queryFn: () => getMyApplications(applicationStatus, page, size),
  });
};

export const useCurrentApplicants = (recruitingStatus: string, page: number, size: number = 6) => {
  return useQuery<ResponseCurrentApplicants>({
    queryKey: ['currentApplicants', recruitingStatus, page, size],
    queryFn: () => getCurrentApplicants(recruitingStatus, page, size),
  });
};
