import { getProfileList, getSingleProfile, getUuidProfileList } from '@/libs/api/profile';
import { ResponseProfile } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = ({ profileId }: { profileId: number }) => {
  return useQuery<ResponseProfile>({
    queryKey: ['profile', profileId],
    queryFn: () => getSingleProfile(profileId),
  });
};

export const useGetProfileList = () => {
  return useQuery<ResponseProfile[]>({
    queryKey: ['profile'],
    queryFn: () => getProfileList(),
  });
};

export const useGetUuidProfileList = (userUuid: string) => {
  return useQuery<ResponseProfile[]>({
    queryKey: ['uuidProfiles', userUuid],
    queryFn: () => getUuidProfileList(userUuid),
    enabled: !!userUuid,
  });
};
