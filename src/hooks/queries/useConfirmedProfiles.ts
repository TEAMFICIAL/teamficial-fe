import { getConfirmedProfile } from '@/libs/api/mypage/applicant';
import { useQuery } from '@tanstack/react-query';

export const useConfirmedProfiles = (postId: number, position: string) => {
  return useQuery({
    queryKey: ['confirmed-profiles', postId, position],
    queryFn: () => getConfirmedProfile(postId, position),
  });
};
