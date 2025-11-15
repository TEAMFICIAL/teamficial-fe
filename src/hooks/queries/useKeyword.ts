import { getKeywords } from '@/libs/api/teampsylog';
import { ResponseKeyword } from '@/types/teampsylog';
import { useQuery } from '@tanstack/react-query';

export const useGetKeyword = ({ profileId }: { profileId: number }) => {
  return useQuery<ResponseKeyword>({
    queryKey: ['keyword', profileId],
    queryFn: () => getKeywords(profileId),
  });
};
