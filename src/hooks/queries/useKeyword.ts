import { getKeywordList, getKeywords } from '@/libs/api/teampsylog';
import { RequestKeyword, ResponseKeyword, ResponseKeywordList } from '@/types/teampsylog';
import { useQuery } from '@tanstack/react-query';

export const useGetKeyword = ({ profileId }: { profileId: number }) => {
  return useQuery<ResponseKeyword>({
    queryKey: ['keyword', profileId],
    queryFn: () => getKeywords(profileId),
  });
};

export const useGetKeywordList = ({ userId, page = 0, size = 3 }: RequestKeyword) => {
  return useQuery<ResponseKeywordList>({
    queryKey: ['keywordList', userId, page, size],
    queryFn: () => getKeywordList({ userId, page, size }),
  });
};
