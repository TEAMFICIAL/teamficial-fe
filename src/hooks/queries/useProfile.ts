import { getSingleProfile } from '@/libs/api/profile';
import { ResponseProfile } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = ({ profileId }: { profileId: number }) => {
  return useQuery<ResponseProfile>({
    queryKey: ['profile', profileId],
    queryFn: () => getSingleProfile(profileId),
  });
};
