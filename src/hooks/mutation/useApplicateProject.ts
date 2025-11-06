import { postApplication } from '@/libs/api/project';
import { PostApplication } from '@/types/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApplicateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: PostApplication) => postApplication(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
