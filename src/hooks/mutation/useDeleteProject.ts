import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '@/libs/api/project';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteProject(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};
