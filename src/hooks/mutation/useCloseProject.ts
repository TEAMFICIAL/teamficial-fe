import { closeRecruitingPost } from '@/libs/api/application';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCloseProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recruitingPostId: number) => closeRecruitingPost(recruitingPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};
