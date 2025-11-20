import { getKeywordComments, getKeywordList, getKeywords } from '@/libs/api/teampsylog';
import {
  RequestKeyword,
  RequestKeywordComment,
  ResponseKeyword,
  ResponseKeywordComment,
  ResponseKeywordList,
} from '@/types/teampsylog';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGetKeyword = ({ profileId }: { profileId: number }) => {
  return useQuery<ResponseKeyword>({
    queryKey: ['keyword', profileId],
    queryFn: () => getKeywords(profileId),
    enabled: !!profileId,
  });
};

export const useGetKeywordList = ({ userId, page = 0, size = 3 }: RequestKeyword) => {
  return useQuery<ResponseKeywordList>({
    queryKey: ['keywordList', userId, page, size],
    queryFn: () => getKeywordList({ userId, page, size }),
    enabled: !!userId,
  });
};

export const useGetKeywordComment = ({ keywordId, page = 0, size = 4 }: RequestKeywordComment) => {
  return useQuery<ResponseKeywordComment>({
    queryKey: ['keywordComment', keywordId, page, size],
    queryFn: () =>
      getKeywordComments({
        keywordId,
        page,
        size,
      }),
    enabled: false,
  });
};

export const useInfiniteKeywordComment = ({
  keywordId,
  size = 4,
}: {
  keywordId: number;
  size?: number;
}) => {
  return useInfiniteQuery<ResponseKeywordComment>({
    queryKey: ['keywordComment', keywordId],
    queryFn: ({ pageParam = 0 }) =>
      getKeywordComments({
        keywordId,
        page: Number(pageParam),
        size,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage.hasNext가 true면 다음 페이지 번호 반환
      if (lastPage.hasNext) {
        return allPages.length; // 다음 page 번호
      }
      return undefined;
    },
    enabled: !!keywordId,
  });
};
