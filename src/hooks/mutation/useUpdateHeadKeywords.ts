import { putHeadKeywords } from '@/libs/api/teampsylog';
import { RequsetHeadKeyword } from '@/types/teampsylog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateHeadKeywords = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ profileId, keywordId, oldHeadKeywordId }: RequsetHeadKeyword) =>
      putHeadKeywords({ profileId, keywordId, oldHeadKeywordId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['keyword', variables.profileId],
      });
    },
  });
};
