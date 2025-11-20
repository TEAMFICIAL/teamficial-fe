import { putHeadKeywords } from '@/libs/api/teampsylog';
import { RequsetHeadKeyword } from '@/types/teampsylog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateHeadKeywords = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ profileId, keywordIds }: RequsetHeadKeyword) =>
      putHeadKeywords({ profileId, keywordIds }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['project', variables.profileId],
      });
    },
  });
};
