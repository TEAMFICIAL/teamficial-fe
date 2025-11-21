import { putHeadKeywords } from '@/libs/api/teampsylog';
import { RequestHeadKeyword } from '@/types/teampsylog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateHeadKeywords = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ profileId, keywordId, oldHeadKeywordId }: RequestHeadKeyword) =>
      putHeadKeywords({ profileId, keywordId, oldHeadKeywordId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['keyword', variables.profileId],
      });
    },
  });
};
